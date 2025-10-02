const express = require('express');
const sequelize = require('./config/database')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

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
  console.log(`server funcando en http://localhost:${port}`)
});

module.exports = app;