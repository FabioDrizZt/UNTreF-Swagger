const { Film } = require('../models/Film')

const getAllFilms = async (req, res) => {
  try {
    const films = await Film.FindByPk(1)
    res.json(films)
  } catch (error) {
    res.status(500).send({ error: 'no se pudieron traer las películas' })
  }
};

module.exports = {
  getAllFilms
};