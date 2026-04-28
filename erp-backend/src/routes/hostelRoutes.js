const express = require('express');
const router = express.Router();

const {
  allocateHostel,
  hostelOccupancy
} = require('../controllers/hostelController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.post('/allocate', protect, authorize(['WARDEN']), allocateHostel);

router.get('/occupancy', protect, authorize(['WARDEN']), hostelOccupancy);

module.exports = router;