const { Book, Issue, Fine } = require("../models");

/**
 * ISSUE BOOK
 */
exports.issueBook = async (req, res) => {
  try {

    const { studentId, bookId } = req.body;

    const book = await Book.findByPk(bookId);

    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({
        message: "Book not available"
      });
    }

    /* SET ISSUE + DUE DATE */

    const issueDate = new Date();

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // 7 day return policy

    await Issue.create({
      studentId,
      bookId,
      issueDate,
      dueDate
    });

    /* REDUCE AVAILABLE COPIES */

    book.availableCopies -= 1;
    await book.save();

    res.json({
      message: "Book issued successfully"
    });

  } catch (error) {

    console.error("Issue Book Error:", error);

    res.status(500).json({
      message: "Book issue failed",
      error: error.message
    });

  }
};


/**
 * GET ISSUED BOOKS
 */
exports.getIssuedBooks = async (req, res) => {
  try {

   const issued = await Issue.findAll({
  where: {
    returnDate: null
  },
  include: [
    {
      model: Book,
      attributes: ["title"]
    }
  ],
  order: [["createdAt", "DESC"]]
});

    const formatted = issued.map((i) => ({
  issueId: i.id,
  studentId: i.studentId,
  bookTitle: i.Book?.title,
  issueDate: i.issueDate || i.createdAt,
  dueDate: i.dueDate,
  returnDate: i.returnDate
}));

    res.json(formatted);

  } catch (error) {

    console.error("Error fetching issued books:", error);

    res.status(500).json({
      message: "Failed to fetch issued books"
    });

  }
};


/**
 * RETURN BOOK
 */
exports.returnBook = async (req, res) => {
  try {

    const issue = await Issue.findByPk(req.params.id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found"
      });
    }

    issue.returnDate = new Date();
    await issue.save();

    const book = await Book.findByPk(issue.bookId);

    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.json({
      message: "Book returned"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Return failed"
    });

  }
};


/**
 * CHECK LIBRARY ELIGIBILITY
 */
exports.checkEligibility = async (req, res) => {
  try {

    const fines = await Fine.findAll({
      include: [
        {
          model: Issue,
          where: { studentId: req.params.studentId }
        }
      ]
    });

    const totalFine = fines
      .filter((f) => !f.paid)
      .reduce((sum, f) => sum + Number(f.amount), 0);

    res.json({
      examBlocked: totalFine > 0,
      pendingFine: totalFine
    });

  } catch (error) {

    console.error("Eligibility Error:", error);

    res.status(500).json({
      message: "Eligibility check failed"
    });

  }
};