const express = require('express');
const sequelize = require('./config/database')
const swaggerSpec = require('./docs/swagger')
const swaggerUi = require('swagger-ui-express')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

// Swagger
app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerSpec,
    {customSiteTitle: "API Películas y Actores - Documentación"}
  )
)

// Swagger formato JSON
app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

let dbOk = false
app.use('/', async (req, res, next) => {
  try {
    if (dbOk) return next()
    await sequelize.authenticate()
    await sequelize.sync()
    dbOk = true
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Routes
const apiRoutes = require('./routes/index');
app.use('/api/v1', apiRoutes);

app.listen(port, () => {
console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
  console.log(`📚 Documentación Swagger disponible en:`);
  console.log(`   • Interfaz web: http://localhost:${port}/api-docs`);
  console.log(`   • JSON Schema: http://localhost:${port}/swagger.json`);
  console.log(`🔗 API Base URL: http://localhost:${port}/api/v1`);
});

module.exports = app;