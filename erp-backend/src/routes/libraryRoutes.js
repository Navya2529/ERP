const express = require('express');
const router = express.Router();

const {
  issueBook,
  returnBook,
  checkEligibility,
  getIssuedBooks,
} = require('../controllers/libraryController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.post('/issue', protect, authorize(['LIBRARIAN']), issueBook);

router.put('/return/:id', protect, authorize(['LIBRARIAN']), returnBook);

router.get('/eligibility/:studentId', protect, checkEligibility);

router.get("/issued", protect, authorize(["LIBRARIAN"]), getIssuedBooks);

module.exports = router;