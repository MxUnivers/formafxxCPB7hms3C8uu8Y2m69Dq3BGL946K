// routes/users.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth'); // Middleware pour vérifier le token
const { updateProfileValidation } = require('../validators/authValidator');
const { getProfile, updateProfile, getUsers } = require('../controllers/userController');


router.get('/profile/:id', authenticateToken, getProfile);
router.put('/profile/:id', authenticateToken, updateProfileValidation, updateProfile);
router.get('/profile/:id', authenticateToken, getProfile);
router.get('/users/get_users', getUsers); // ← Ajoute cette ligne

module.exports = router;