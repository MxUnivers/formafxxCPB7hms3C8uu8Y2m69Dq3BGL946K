// routes/modules.js
const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

const { addModule } = require('../controllers/formationController');

// ✅ POST /api/modules - Ajouter un module à une formation

router.post('/formations/:formationId/modules', authenticateToken, adminOnly, addModule);

module.exports = router;