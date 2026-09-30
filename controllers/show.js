const Estudiante = require('../models/show')

function responderError(res, error) {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ mensaje: error.message })
  }
  return res.status(500).json({ mensaje: 'Error interno del servidor' })
}

const controller = {
  obtenerEstudiantes: async function (req, res) {
    try {
      const estudiantes = await Estudiante.find()
      return res.status(200).json(estudiantes)
    } catch (error) {
      return responderError(res, error)
    }
  },
  obtenerEstudiante: async function (req, res) {
    try {
      const estudiante = await Estudiante.findById(req.params.id)
      if (!estudiante) return res.status(404).json({ mensaje: 'Estudiante no encontrado' })
      return res.status(200).json(estudiante)
    } catch (error) {
      return responderError(res, error)
    }
  },
  crearEstudiante: async function (req, res) {
    const { nombre, correo, edad } = req.body
    if (typeof nombre !== 'string' || !nombre.trim() ||
        typeof correo !== 'string' || !correo.trim() ||
        edad === undefined || edad === null || edad === '') {
      return res.status(400).json({ mensaje: 'nombre, correo y edad son obligatorios' })
    }

    try {
      const estudiante = await Estudiante.create({ nombre, correo, edad })
      return res.status(201).json(estudiante)
    } catch (error) {
      return responderError(res, error)
    }
  },
  actualizarEstudiante: async function (req, res) {
    const cambios = {}
    for (const campo of ['nombre', 'correo', 'edad']) {
      if (req.body[campo] !== undefined) cambios[campo] = req.body[campo]
    }
    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ mensaje: 'Envía al menos un campo para actualizar' })
    }

    try {
      const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, cambios, {
        new: true,
        runValidators: true
      })
      if (!estudiante) return res.status(404).json({ mensaje: 'Estudiante no encontrado' })
      return res.status(200).json(estudiante)
    } catch (error) {
      return responderError(res, error)
    }
  },
  eliminarEstudiante: async function (req, res) {
    try {
      const estudiante = await Estudiante.findByIdAndDelete(req.params.id)
      if (!estudiante) return res.status(404).json({ mensaje: 'Estudiante no encontrado' })
      return res.status(200).json({ mensaje: 'Estudiante eliminado', estudiante })
    } catch (error) {
      return responderError(res, error)
    }
  }
}

module.exports = controller