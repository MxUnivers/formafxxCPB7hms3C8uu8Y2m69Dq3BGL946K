// models/Module.js
const mongoose  =  require("mongoose");

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: false },
  description: { type: String },
  isPaid: { type: Boolean, default: false }, // Module payant ?
  formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation', required: true },
  order: { type: Number }, // Ordre dans la formation
});

const  Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;