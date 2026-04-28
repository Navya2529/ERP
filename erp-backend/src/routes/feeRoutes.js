const express = require('express');
const router = express.Router();

const { payFees, getFeeStatus } = require('../controllers/feeController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.post('/pay', protect, authorize(['ACCOUNTANT']), payFees);

router.get('/status/:studentId', protect, getFeeStatus);

module.exports = router;