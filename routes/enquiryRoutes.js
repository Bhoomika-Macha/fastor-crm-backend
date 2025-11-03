const express = require('express');
const router = express.Router();
const {
  submitEnquiry,
  getPublicEnquiries,
  getPrivateEnquiries,
  claimLead
} = require('../controllers/enquiryController');
const protect = require('../middlewares/auth');

// Public route - anyone can submit an enquiry
router.post('/public', submitEnquiry);

// Protected routes - require JWT
router.get('/public', protect, getPublicEnquiries);
router.get('/private', protect, getPrivateEnquiries);
router.patch('/:id/claim', protect, claimLead);

module.exports = router;
