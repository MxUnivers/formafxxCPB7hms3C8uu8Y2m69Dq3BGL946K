// routes/formations.js
const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const { createFormationValidation } = require('../validators/formationValidator');

const {
  createFormation,
  getAllFormations,
  getFormationById,
  updateFormation,
  deleteFormation,
  enrollInFormation,
  addPaidParticipant,
} = require('../controllers/formationController');

// 🔍 GET /api/formations - Lister toutes les formations (avec filtres)
router.get('/', getAllFormations);

// 🔍 GET /api/formations/:id - Obtenir une formation + modules + leçons
router.get('/:id', authenticateToken, getFormationById);

// ✅ POST /api/formations - Créer une nouvelle formation (Admin)
router.post('/', authenticateToken, adminOnly, createFormationValidation, createFormation);

// ✏️ PUT /api/formations/:id - Mettre à jour une formation
router.put('/:id', authenticateToken, adminOnly, updateFormation);

// ❌ DELETE /api/formations/:id - Désactiver une formation
router.delete('/:id', authenticateToken, adminOnly, deleteFormation);

// 🧑‍🎓 POST /api/formations/:id/enroll - S'inscrire à une formation
router.post('/:id/enroll', authenticateToken, enrollInFormation);

// 💰 POST /api/formations/:id/paid-participants - Ajouter un utilisateur ayant payé
router.post('/:id/paid-participants', authenticateToken, adminOnly, addPaidParticipant);

module.exports = router;