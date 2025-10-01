// controllers/authController.js

const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// @route   POST /api/auth/register
// @desc    Inscrire un nouvel utilisateur
// @access  Public
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, phone, bio, role , profilePicture } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Un Compte avec cet email existe déjà.' });
    }

    // Créer un nouvel utilisateur
    user = new User({
      firstName,
      lastName,
      email,
      password,
      profilePicture:profilePicture,
      phone,
      bio,
      role: role||'Student', // Par défaut
    });

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarder dans la base
    await user.save();

    // Générer un token JWT
    const payload = { user: { id: user._id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// @route   POST /api/auth/login
// @desc    Connecter un utilisateur et renvoyer un JWT
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Valider les champs
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Mettre à jour la dernière connexion
    user.lastLogin = new Date();
    await user.save();

    // Générer un token JWT
    const payload = { user: { id: user._id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });

    res.json({
      message:"Authentification réussi avec succès",
      token,
      data:user,
      // user: {
      //   id: user._id,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   email: user.email,
      //   role: user.role,
      //   profilePicture: user.profilePicture,
      //   theme: user.theme,
      // },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Authentification échoué' });
  }
};