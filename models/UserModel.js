// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Informations de base
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // Hashé (bcrypt)
  phone: { type: String },
  profilePicture: { type: String }, // URL de l'image
  bio: { type: String, maxlength: 500 },

  // Rôle dans la plateforme
  role: {
    type: String,
    enum: ['Student', 'Support', 'Instructor', 'Admin', 'SuperAdmin'],
    default: 'Student',
    required: true,
  },

  // Statut du compte
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  lastLogin: { type: Date },

  // Formations
  enrolledFormations: [
    {
      formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation', required: true },
      enrollmentDate: { type: Date, default: Date.now },
      isCompleted: { type: Boolean, default: false },
      completionDate: { type: Date },
    },
  ],

  // Sessions de formation
  registeredSessions: [
    {
      session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
      registrationDate: { type: Date, default: Date.now },
      attended: { type: Boolean, default: false }, // A-t-il participé ?
    },
  ],

  // Liste d'attente pour les sessions complètes
  waitingListSessions: [
    {
      session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
      addedDate: { type: Date, default: Date.now },
    },
  ],

  // Récompenses : badges, certifications, etc.
  rewards: [
    {
      type: { type: String, enum: ['Badge', 'Certification'], required: true },
      name: { type: String, required: true },
      description: { type: String },
      image: { type: String }, // URL du badge ou certificat
      awardedAt: { type: Date, default: Date.now },
      formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation' }, // Optionnel : lié à une formation
    },
  ],

  // Accompagnement personnalisé
  hasMentorship: { type: Boolean, default: false }, // Bénéficie-t-il d’un accompagnement ?
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence à un formateur ou tuteur (role: Instructor ou Support)

  // Préférences
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  notificationsEnabled: { type: Boolean, default: true },

  // Historique des activités (optionnel, pour analytics)
  activityHistory: [
    {
      action: { type: String, required: true }, // ex: "started_lesson", "submitted_exercise"
      target: { type: mongoose.Schema.Types.ObjectId, refPath: 'activityHistory.targetModel' },
      targetModel: { type: String, enum: ['Formation', 'Module', 'Lesson', 'Exercise'] },
      timestamp: { type: Date, default: Date.now },
    },
  ],

}, {
  timestamps: true, // createdAt, updatedAt
});

// 🔍 Index pour optimiser les recherches fréquentes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ 'enrolledFormations.formation': 1 });
UserSchema.index({ mentor: 1 });

module.exports = mongoose.model('User', UserSchema);