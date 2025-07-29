// validators/formationValidator.js
const { body } = require('express-validator');

exports.createFormationValidation = [
  body('title').not().isEmpty().withMessage('Le titre est requis'),
  body('description').not().isEmpty().withMessage('La description est requise'),
  body('category').not().isEmpty().withMessage('La catégorie est requise'),
  body('level').isIn(['Débutant', 'Intermédiaire', 'Avancé']),
  body('duration').isInt({ min: 1 }).withMessage('La durée doit être un nombre positif'),
  body('price').isFloat({ min: 0 }).withMessage('Le prix doit être positif'),
  body('instructor.name').not().isEmpty(),
  body('instructor.expertise').not().isEmpty(),
];