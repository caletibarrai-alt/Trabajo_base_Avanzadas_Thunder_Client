const mongoose = require('mongoose')

const estudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  correo: { type: String, required: true, trim: true },
  edad: { type: Number, required: true }
})

module.exports = mongoose.model('Estudiante', estudianteSchema)