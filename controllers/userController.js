// controllers/userController.js

const User = require('../models/UserModel');
const { body, validationResult } = require('express-validator');

// @route   GET /api/users/profile
// @desc    Obtenir le profil de l'utilisateur connecté
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Ne pas envoyer le mot de passe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   PUT /api/users/profile
// @desc    Mettre à jour le profil de l'utilisateur
// @access  Private
exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, phone, bio, profilePicture, theme, notificationsEnabled } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour les champs
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    user.bio = bio || user.bio;
    user.profilePicture = profilePicture || user.profilePicture;
    user.theme = theme || user.theme;
    user.notificationsEnabled = notificationsEnabled ?? user.notificationsEnabled;

    await user.save();

    res.json({
      message: 'Profil mis à jour',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        theme: user.theme,
        notificationsEnabled: user.notificationsEnabled,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};