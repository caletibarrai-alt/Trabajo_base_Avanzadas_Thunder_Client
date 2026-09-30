const { Router } = require('express')
const ShowController = require('../controllers/show')

const router = Router()

router.get('/', ShowController.obtenerEstudiantes)
router.get('/:id', ShowController.obtenerEstudiante)
router.post('/', ShowController.crearEstudiante)
router.put('/:id', ShowController.actualizarEstudiante)
router.delete('/:id', ShowController.eliminarEstudiante)

module.exports = router