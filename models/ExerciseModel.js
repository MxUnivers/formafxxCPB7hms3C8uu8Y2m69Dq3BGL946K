// models/Exercise.js

const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Titre de l'exercice
  description: { type: String, required: true }, // Énoncé ou consigne
  type: {
    type: String,
    enum: ['Case à cocher', 'Séance pratique', 'Étapes', 'QCM', 'Projet', 'Code à écrire'],
    required: true,
  }, // Type d'exercice

  // Pour les exercices structurés en étapes
  steps: [
    {
      title: { type: String },
      description: { type: String },
    },
  ],

  // Solution ou correction
  solution: { type: String }, // Peut être du texte, du code, ou un lien vers un document

  // Référence à la leçon ou au module
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }, // Optionnel : si lié à une leçon
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' }, // Optionnel : si lié à un module
  formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation', required: true }, // Toujours lié à une formation

  // Difficulté (optionnel)
  difficulty: { type: String, enum: ['Facile', 'Moyen', 'Difficile'] },

  // Temps estimé pour compléter l'exercice (en minutes)
  estimatedTime: { type: Number },

  // Actif ou archivé
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Exercise', ExerciseSchema);