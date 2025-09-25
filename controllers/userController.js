// controllers/userController.js

const User = require('../models/UserModel');
const { body, validationResult } = require('express-validator');

// @route   GET /api/users/profile
// @desc    Obtenir le profil de l'utilisateur connecté
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const  idUser =  req.params.id;
    const user = await User.findById(idUser).select('-password'); // Ne pas envoyer le mot de passe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({data:user, message :"utilisateur récupérer avec succès"});
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
  const  idUser =  req.params.id;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, phone, bio, profilePicture, theme, notificationsEnabled } = req.body;

  try {
    const user = await User.findById(idUser);
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
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// @route   GET /api/v1/users/get_users
// @desc    Récupérer tous les utilisateurs avec filtres optionnels
// @access  Private (protégé par authenticateToken)
exports.getUsers = async (req, res) => {
  try {
    const {
      search,
      startDate,
      endDate,
      lastLoginStart,
      lastLoginEnd,
    } = req.query;

    const filter = {};

    // 🔍 Recherche textuelle
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
      ];
    }

    // 📅 Filtre sur createdAt
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // 🕒 Filtre sur lastLogin
    if (lastLoginStart || lastLoginEnd) {
      filter.lastLogin = {};
      if (lastLoginStart) filter.lastLogin.$gte = new Date(lastLoginStart);
      if (lastLoginEnd) filter.lastLogin.$lte = new Date(lastLoginEnd);
    }

    // Récupérer les utilisateurs ET le total
    const users = await User.find(filter).select('-password'); // Ne jamais envoyer le mot de passe
    const count = users.length; // ou mieux : await User.countDocuments(filter) si tu veux le total global (utile pour pagination)

    res.status(200).json({
      success: true,
      count,
      data: users,
      message: "Utilisateurs récupérés avec succès"
    });
  } catch (error) {
    console.error('Erreur dans getUsers:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la récupération des utilisateurs' });
  }
};