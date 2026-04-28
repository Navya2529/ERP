const express = require('express');
const router = express.Router();

const {
  adminDashboard,
  admissionDashboard,
  feeDashboard,
  hostelDashboard,
  libraryDashboard,
  examDashboard
} = require('../controllers/dashboardController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

/* ADMIN MASTER DASHBOARD */
router.get('/admin', protect, authorize(['ADMIN']), adminDashboard);

/* MODULE DASHBOARDS */

router.get('/admissions', protect, authorize(['ADMIN']), admissionDashboard);

router.get('/fees', protect, authorize(['ADMIN','ACCOUNTANT']), feeDashboard);

router.get('/hostel', protect, authorize(['ADMIN','WARDEN']), hostelDashboard);

router.get('/library', protect, authorize(['ADMIN','LIBRARIAN']), libraryDashboard);

router.get('/exams', protect, authorize(['ADMIN']), examDashboard);

module.exports = router;