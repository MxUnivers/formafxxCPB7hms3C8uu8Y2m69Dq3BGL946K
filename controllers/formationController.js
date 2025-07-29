// controllers/formationController.js

const Formation = require('../models/FormationModel');
const Module = require('../models/ModuleModel');
const User = require('../models/UserModel');
const { body, validationResult } = require('express-validator');

// @route   POST /api/formations
// @desc    Créer une nouvelle formation (Admin uniquement)
// @access  Private (Admin / SuperAdmin)
exports.createFormation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, category, level, duration, price, technologies, instructor } = req.body;

  try {
    const formation = new Formation({
      title,
      description,
      category,
      level,
      duration,
      price,
      technologies,
      instructor,
    });

    await formation.save();
    res.status(201).json(formation);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   GET /api/formations
// @desc    Lister toutes les formations (actives)
// @access  Public
// controllers/formationController.js

exports.getAllFormations = async (req, res) => {
  try {
    const {
      search,           // Recherche globale
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      level,
      category,
      technology,
      minStudents,
      maxStudents,
      hasPaidModules,
      includeStudents,
      includePaidUsers,
      minCreatedAt,     // 🔥 Nouveau : date min création
      maxCreatedAt,     // 🔥 Nouveau : date max création
    } = req.query;

    // ------------------------------
    // 1. Construction du filtre
    // ------------------------------
    const filter = { isActive: true };

    // 🔍 Recherche globale
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    // 💰 Prix
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = parseFloat(maxPrice);
    }

    // ⭐ Note
    if (minRating !== undefined || maxRating !== undefined) {
      filter.rating = {};
      if (minRating !== undefined) filter.rating.$gte = parseFloat(minRating);
      if (maxRating !== undefined) filter.rating.$lte = parseFloat(maxRating);
    }

    // 🎯 Niveau
    if (level) {
      filter.level = level;
    }

    // 🏷️ Catégorie
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    // 🛠️ Technologie
    if (technology) {
      filter.technologies = { $in: [new RegExp(technology, 'i')] };
    }

    // 👥 Nombre d'étudiants
    if (minStudents !== undefined || maxStudents !== undefined) {
      filter.studentsCount = {};
      if (minStudents !== undefined) filter.studentsCount.$gte = parseInt(minStudents);
      if (maxStudents !== undefined) filter.studentsCount.$lte = parseInt(maxStudents);
    }

    // 🔐 Modules payants
    if (hasPaidModules === 'true') {
      filter.paidModulesParticipants = { $exists: true, $ne: [] };
    }

    // 📅 🔥 Intervalle de date de création
    if (minCreatedAt || maxCreatedAt) {
      filter.createdAt = {};
      if (minCreatedAt) {
        const date = new Date(minCreatedAt);
        if (isNaN(date.getTime())) {
          return res.status(400).json({ message: 'minCreatedAt invalide. Utilisez ISO (ex: 2024-01-01)' });
        }
        filter.createdAt.$gte = date;
      }
      if (maxCreatedAt) {
        const date = new Date(maxCreatedAt);
        if (isNaN(date.getTime())) {
          return res.status(400).json({ message: 'maxCreatedAt invalide. Utilisez ISO (ex: 2024-12-31)' });
        }
        // Inclure toute la journée
        if (maxCreatedAt && !maxCreatedAt.includes('T')) {
          date.setUTCHours(23, 59, 59, 999); // Pour inclure toute la journée
        }
        filter.createdAt.$lte = date;
      }
    }

    // ------------------------------
    // 2. Requête principale
    // ------------------------------
    let query = Formation.find(filter);

    query = query.select('title description category level duration price rating technologies instructor studentsCount createdAt');
    query = query.sort({ createdAt: -1 });

    const formations = await query.exec();

    // ------------------------------
    // 3. Ajout des données optionnelles
    // ------------------------------
    const result = await Promise.all(
      formations.map(async (formation) => {
        const resultItem = formation.toObject();

        // 👥 Inscrits
        if (includeStudents === 'true') {
          try {
            const students = await User.find(
              { _id: { $in: formation.enrolledStudents } },
              'firstName lastName email'
            ).lean();
            resultItem.enrolledStudentsList = students;
          } catch (err) {
            resultItem.enrolledStudentsList = [];
          }
        }

        // 💳 Payants
        if (includePaidUsers === 'true') {
          try {
            const paidUsers = await User.find(
              { _id: { $in: formation.paidModulesParticipants } },
              'firstName lastName email'
            ).lean();
            resultItem.paidParticipantsList = paidUsers;
          } catch (err) {
            resultItem.paidParticipantsList = [];
          }
        }

        return resultItem;
      })
    );

   return res.status(200).json({data:result});
  } catch (err) {
    console.error('Erreur dans getAllFormations:', err.message);
    return res.status(500).json({ message: 'Erreur serveur lors de la récupération des formations' });
  }
};

// @route   GET /api/formations/:id
// @desc    Obtenir une formation avec ses modules, leçons et exercices
// @access  Private (étudiant inscrit ou admin)
exports.getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation || !formation.isActive) {
      return res.status(404).json({ message: 'Formation non trouvée ou désactivée' });
    }

    // Vérifier si l'utilisateur est inscrit (sauf admin)
    if (req.user.role === 'Student') {
      const isEnrolled = formation.enrolledStudents.some(id => id.toString() === req.user.id);
      if (!isEnrolled) {
        return res.status(403).json({ message: 'Accès refusé : vous n’êtes pas inscrit à cette formation' });
      }
    }

    // Peupler les modules → leçons → exercices
    const modules = await Module.find({ formation: formation._id, isActive: true })
      .populate({
        path: 'lessons',
        populate: {
          path: 'exercises',
          match: { isActive: true }, // Seulement les exercices actifs
        },
        match: { isActive: true },
      })
      .sort('order');

    res.json({
      formation,
      modules,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   PUT /api/formations/:id
// @desc    Mettre à jour une formation
// @access  Private (Admin)
exports.updateFormation = async (req, res) => {
  const { title, description, category, level, duration, price, technologies, instructor, isActive } = req.body;

  try {
    let formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }

    formation = Object.assign(formation, {
      title,
      description,
      category,
      level,
      duration,
      price,
      technologies,
      instructor,
      isActive: isActive !== undefined ? isActive : formation.isActive,
    });

    await formation.save();
    res.json(formation);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   DELETE /api/formations/:id
// @desc    Désactiver (soft delete) une formation
// @access  Private (Admin)
exports.deleteFormation = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }

    formation.isActive = false;
    await formation.save();

    res.json({ message: 'Formation désactivée avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



// @route   POST /api/formations/:formationId/modules
// @desc    Ajouter un module à une formation
// @access  Private (Admin)
exports.addModule = async (req, res) => {
  const { title, description, isPaid, order } = req.body;

  try {
    const formation = await Formation.findById(req.params.formationId);
    if (!formation || !formation.isActive) {
      return res.status(404).json({ message: 'Formation non trouvée ou désactivée' });
    }

    const module = new Module({
      title,
      description,
      isPaid,
      order,
      formation: formation._id,
    });

    await module.save();
    res.status(201).json(module);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   POST /api/modules/:moduleId/lessons
// @desc    Ajouter une leçon à un module
// @access  Private (Admin)
exports.addLesson = async (req, res) => {
  const { title, description, videos, images, duration, order } = req.body;

  try {
    const module = await Module.findById(req.params.moduleId).populate('formation');
    if (!module || !module.formation.isActive) {
      return res.status(404).json({ message: 'Module ou formation non trouvée' });
    }

    const lesson = new Lesson({
      title,
      description,
      videos,
      images,
      duration,
      order,
      module: module._id,
    });

    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// @route   POST /api/lessons/:lessonId/exercises
// @desc    Ajouter un exercice à une leçon
// @access  Private (Admin)
exports.addExercise = async (req, res) => {
  const { title, description, type, steps, solution, difficulty, estimatedTime } = req.body;

  try {
    const lesson = await Lesson.findById(req.params.lessonId).populate('module');
    if (!lesson) {
      return res.status(404).json({ message: 'Leçon non trouvée' });
    }

    const exercise = new Exercise({
      title,
      description,
      type,
      steps,
      solution,
      difficulty,
      estimatedTime,
      lesson: lesson._id,
      module: lesson.module._id,
      formation: lesson.module.formation,
    });

    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// @route   POST /api/formations/:id/enroll
// @desc    S'inscrire à une formation
// @access  Private (Student)
exports.enrollInFormation = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation || !formation.isActive) {
      return res.status(404).json({ message: 'Formation non disponible' });
    }

    // Vérifier si déjà inscrit
    if (formation.enrolledStudents.some(id => id.toString() === req.user.id)) {
      return res.status(400).json({ message: 'Vous êtes déjà inscrit à cette formation' });
    }

    // Ajouter à la liste des inscrits
    formation.enrolledStudents.push(req.user.id);
    formation.studentsCount = formation.enrolledStudents.length;
    await formation.save();

    // Mettre à jour l'utilisateur
    await User.findByIdAndUpdate(req.user.id, {
      $push: { enrolledFormations: { formation: formation._id } },
    });

    res.json({ message: 'Inscription réussie', formationId: formation._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// @route   POST /api/formations/:id/add-paid-participant
// @desc    Ajouter un utilisateur à la liste des payeurs (Admin ou après paiement)
// @access  Private (Admin ou via système de paiement)
exports.addPaidParticipant = async (req, res) => {
  const { userId } = req.body;

  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (formation.paidModulesParticipants.some(id => id.toString() === userId)) {
      return res.status(400).json({ message: 'Cet utilisateur a déjà accès aux modules payants' });
    }

    formation.paidModulesParticipants.push(userId);
    await formation.save();

    res.json({ message: 'Utilisateur ajouté aux participants payants', userId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};