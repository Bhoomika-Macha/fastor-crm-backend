// controllers/enquiryController.js
const { Enquiry } = require('../models');

// (1) PUBLIC - Submit new enquiry (no authentication required)
exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, courseInterest } = req.body;

    if (!name || !email || !courseInterest) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      courseInterest,
      claimed: false,
      counselorId: null
    });

    res.status(201).json({
      message: 'Enquiry submitted successfully!',
      enquiry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// (2) PROTECTED - Fetch all unclaimed leads
exports.getPublicEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      where: { claimed: false }
    });

    res.status(200).json({ enquiries });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// (3) PROTECTED - Fetch all leads claimed by logged-in counselor
exports.getPrivateEnquiries = async (req, res) => {
  try {
    const counselorId = req.user;
    const enquiries = await Enquiry.findAll({
      where: { counselorId }
    });

    res.status(200).json({ enquiries });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// (4) PROTECTED - Claim a public enquiry
exports.claimLead = async (req, res) => {
  try {
    const { id } = req.params;
    const counselorId = req.user;

    const enquiry = await Enquiry.findByPk(id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found.' });
    }

    if (enquiry.claimed === true) {
      return res.status(409).json({ message: 'This lead has already been claimed.' });
    }

    // Update enquiry to assign to logged-in counselor
    enquiry.claimed = true;
    enquiry.counselorId = counselorId;
    await enquiry.save();

    res.status(200).json({
      message: 'Lead claimed successfully!',
      enquiry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
