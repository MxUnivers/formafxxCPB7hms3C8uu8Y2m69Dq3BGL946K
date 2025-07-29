// routes/users.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth'); // Middleware pour vérifier le token
const { updateProfileValidation } = require('../validators/authValidator');
const { getProfile, updateProfile } = require('../controllers/userController');


router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfileValidation, updateProfile);

module.exports = router;