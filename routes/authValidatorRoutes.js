// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation } = require('../validators/authValidator');
const { register, login } = require('../controllers/authController');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;