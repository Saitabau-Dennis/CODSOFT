const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Use the authController in your routes
router.post('/login', authController.login);
router.post('/register', authController.register);
// ... other routes

module.exports = router;
