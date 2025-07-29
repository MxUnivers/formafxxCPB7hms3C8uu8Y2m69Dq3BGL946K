// models/Lesson.js
const mongoose =  require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videos: [{ type: String }], // URLs des vidéos
  images: [{ type: String }], // URLs des images illustratives
  duration: { type: Number }, // Durée en minutes
  order: { type: Number }, // Ordre dans le module
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true }, // Référence au module
});