const express = require('express')
const show_routes = require('./routes/show')

const app = express()

app.set('port', 3000)

// middleware
app.use(express.json())
// routes
app.use('/api/estudiantes', show_routes)

module.exports = app