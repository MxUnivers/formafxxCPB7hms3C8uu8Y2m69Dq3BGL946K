// routes/lessons.js
const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

const { addLesson } = require('../controllers/formationController');

// ✅ POST /api/lessons - Ajouter une leçon (avec moduleId dans le body)
router.post('/', authenticateToken, adminOnly, addLesson);

// ✅ POST /api/modules/:moduleId/lessons - Ajouter une leçon à un module
router.post('/modules/:moduleId/lessons', authenticateToken, adminOnly, addLesson);

module.exports = router;