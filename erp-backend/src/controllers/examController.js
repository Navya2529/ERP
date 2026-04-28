const Exam = require('../models/Exam');
const Registration = require('../models/Registration');
const HallTicket = require('../models/HallTicket');
const Fee = require('../models/Fee');
const Issue = require('../models/Issue');
const Student = require('../models/Student');

/**
 * CHECK ELIGIBILITY
 */
const checkEligibility = async (studentId) => {

  // Fee check
  const paidFee = await Fee.findOne({
    where: {
      student_id: studentId,
      payment_status: 'PAID'
    }
  });

  if (!paidFee) {
    return {
      eligible: false,
      reason: "Pending fee payment"
    };
  }

  // Library check
  const pendingBook = await Issue.findOne({
    where: {
      studentId: studentId,
      returnDate: null
    }
  });

  if (pendingBook) {
    return {
      eligible: false,
      reason: "Library book not returned"
    };
  }

  return {
    eligible: true
  };
};

/**
 * REGISTER FOR EXAM
 */
exports.registerExam = async (req, res) => {
  try {

    console.log("JWT USER:", req.user);

    const email = req.user.email || req.user.id;

    const student = await Student.findOne({
      where: { email }
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const { examId } = req.body;

    const eligibility = await checkEligibility(student.student_id);

if (!eligibility.eligible) {
  return res.status(403).json({
    message: "Not eligible for exam",
    reason: eligibility.reason
  });
}

    const registration = await Registration.create({
      studentId: student.student_id,
      examId
    });

    const hallTicket = await HallTicket.create({
      registrationId: registration.id
    });

    res.json({
      message: "Exam registered successfully",
      hallTicketNumber: hallTicket.hallTicketNumber
    });

  } catch (error) {

    console.error("Exam registration error:", error);

    res.status(500).json({
      message: "Exam registration failed",
      error: error.message
    });
  }
};

/**
 * GET HALL TICKET
 */
exports.getHallTicket = async (req, res) => {
  try {
    const ticket = await HallTicket.findOne({
      include: [{
        model: Registration,
        where: { studentId: req.params.studentId }
      }]
    });

    if (!ticket) {
      return res.status(404).json({ message: 'Hall ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
  console.error("Hall ticket error:", error);

  res.status(500).json({
    message: "Error fetching hall ticket",
    error: error.message
  });
}
};
