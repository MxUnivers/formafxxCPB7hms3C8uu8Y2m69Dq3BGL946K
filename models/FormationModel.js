// models/Formation.js
const mongoose =  require("mongoose");

const FormationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Débutant', 'Intermédiaire', 'Avancé'], required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  technologies: [{ type: String }],
  instructor: {
    name: { type: String, required: true },
    expertise: { type: String, required: true },
  },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  paidModulesParticipants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Formation', FormationSchema);