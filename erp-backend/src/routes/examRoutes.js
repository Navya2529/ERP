const express = require('express');
const router = express.Router();

const {
  registerExam,
  getHallTicket
} = require('../controllers/examController');

const { protect } = require('../middleware/authMiddleware');

router.post('/register', protect, registerExam);

router.get('/hallticket/:studentId', protect, getHallTicket);

module.exports = router;