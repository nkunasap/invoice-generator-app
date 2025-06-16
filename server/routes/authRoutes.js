const express = require('express');
const router = express.Router();
const { register, login } = require('server/controllers/authController.js');

router.post('/register', register);
router.post('/login', login);
module.exports = router;
router.get('/verify', protect, verify);

