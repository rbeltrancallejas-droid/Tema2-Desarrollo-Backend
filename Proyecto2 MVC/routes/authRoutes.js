const express = require('express');

const router = express.Router();

const { login } = require('../controllers/authController');

router.post('/auth/login', login);

// This route handles POST requests to authenticate a user.
// It receives the nickname and password and returns a JWT token.

module.exports = router;