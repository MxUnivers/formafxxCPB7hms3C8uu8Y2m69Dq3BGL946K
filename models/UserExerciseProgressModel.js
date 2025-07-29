// models/UserExerciseProgress.js
const mongoose  =  require("mongoose");

const UserExerciseProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation', required: true },

  // Pourcentage de complétion (calculé côté front ou back selon la logique)
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },

  // Tentatives (utile pour les exercices pratiques)
  attempts: { type: Number, default: 0 },

  // Dernière tentative
  lastAttemptAt: { type: Date },

  // Si l'utilisateur a consulté la correction
  hasViewedSolution: { type: Boolean, default: false },

  // Réponse de l'utilisateur (selon le type)
  userResponse: {
    type: mongoose.Schema.Types.Mixed, // Peut être texte, tableau de réponses, code, etc.
  },

  // Validé par le système ou un formateur ?
  isCorrect: { type: Boolean },

  // Feedback personnalisé (optionnel)
  feedback: { type: String },

  // Statut
  status: {
    type: String,
    enum: ['En cours', 'Soumis', 'Corrigé', 'Réussi', 'Échoué'],
    default: 'En cours',
  },
}, { timestamps: true });

// Index unique pour éviter les doublons
UserExerciseProgressSchema.index({ user: 1, exercise: 1 }, { unique: true });

module.exports = mongoose.model('UserExerciseProgress', UserExerciseProgressSchema);