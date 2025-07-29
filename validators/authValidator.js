// validators/authValidator.js

const { body } = require('express-validator');

exports.registerValidation = [
  body('firstName', 'Le prénom est requis').not().isEmpty(),
  body('lastName', 'Le nom est requis').not().isEmpty(),
  body('email', 'Un email valide est requis').isEmail(),
  body('password', 'Le mot de passe doit faire au moins 6 caractères').isLength({ min: 6 }),
  body('phone', 'Numéro de téléphone invalide').optional().isMobilePhone(),
  body('bio', 'La bio ne doit pas dépasser 500 caractères').optional().isLength({ max: 500 }),
];

exports.loginValidation = [
  body('email', 'Un email valide est requis').isEmail(),
  body('password', 'Le mot de passe est requis').exists(),
];

exports.updateProfileValidation = [
  body('firstName').optional().not().isEmpty().withMessage('Le prénom ne peut pas être vide'),
  body('lastName').optional().not().isEmpty().withMessage('Le nom ne peut pas être vide'),
  body('phone').optional().isMobilePhone().withMessage('Numéro de téléphone invalide'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio trop longue'),
  body('theme').optional().isIn(['light', 'dark']).withMessage('Thème invalide'),
  body('notificationsEnabled').optional().isBoolean(),
];