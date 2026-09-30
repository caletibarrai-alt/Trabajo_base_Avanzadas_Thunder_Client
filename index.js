const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect('mongodb://127.0.0.1:27017/estudiantes_db')
  .then(() => {
    console.log('MongoDB conectado correctamente')

    app.listen(app.get('port'), () => {
      console.log('Servidor activo en http://localhost:3000')
    })
  })
  .catch(error => {
    console.error('No se pudo conectar a MongoDB:', error.message)
    process.exit(1)
  })