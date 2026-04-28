const express = require('express');
const router = express.Router();

const { approveAdmission } = require('../controllers/admissionController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.put('/approve/:id', protect, authorize(['ADMIN']), approveAdmission);

module.exports = router;