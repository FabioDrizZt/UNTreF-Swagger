const { Actor } = require('../models/Actor')

const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll()
    if (actors.length > 0) {
      res.json(actors)
    } else {
      res.status(404).send({ error: 'No se encontraron actores para listar' })
    }
  } catch (error) {
    res.status(500).send({ error: 'Error en el servidor', description: error.message })
  }
};

module.exports = {
  getAllActors
};