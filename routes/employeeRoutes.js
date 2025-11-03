const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/employeeController');

// Register a new employee
router.post('/register', register);

// Employee login
router.post('/login', login);

module.exports = router;
