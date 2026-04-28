const express = require('express');
const router = express.Router();

const {
  createStudent,
  getStudent,
  updateStudent,
  getAllStudents,
  getMyProfile
} = require('../controllers/studentController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.post('/create', protect, authorize(['ADMIN']), createStudent);

router.get('/me', protect, authorize(['STUDENT']), getMyProfile)

router.get('/:id', protect, getStudent);

router.put('/:id', protect, authorize(['ADMIN']), updateStudent);

router.get('/', protect, authorize(['ADMIN']), getAllStudents);

;

module.exports = router;