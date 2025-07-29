// routes/exercises.js
const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

const { addExercise } = require('../controllers/formationController');

// ✅ POST /api/exercises - Ajouter un exercice (avec lessonId dans le body)
router.post('/', authenticateToken, adminOnly, addExercise);

// ✅ POST /api/lessons/:lessonId/exercises - Ajouter un exercice à une leçon
router.post('/lessons/:lessonId/exercises', authenticateToken, adminOnly, addExercise);

module.exports = router;