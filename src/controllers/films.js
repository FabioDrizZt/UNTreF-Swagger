const Film = require("../models/Film");
const Actor = require("../models/Actor");

const getAllFilms = async (req, res) => {
  try {
    const films = await Film.findAll();
    if (films.length > 0) {
      res.json(films);
    } else {
      res
        .status(404)
        .send({ error: "No se encontraron películas para listar" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id);
    if (film) {
      res.json(film);
    } else {
      res.status(404).send({ error: "Película no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const createFilm = async (req, res) => {
  try {
    const { title, description, release_year } = req.body;
    if (!title) {
      return res.status(400).send({ error: "El campo title es requerido" });
    }
    const newFilm = await Film.create({ title, description, release_year });
    res.status(201).json(newFilm);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const updateFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, release_year } = req.body;

    const film = await Film.findByPk(id);
    if (!film) {
      return res.status(404).send({ error: "Película no encontrada" });
    }

    await film.update({ title, description, release_year });
    res.json(film);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const deleteFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id);
    if (!film) {
      return res.status(404).send({ error: "Película no encontrada" });
    }

    await film.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const getFilmActors = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id, {
      include: [
        {
          model: Actor,
          through: { attributes: [] },
        },
      ],
    });

    if (!film) {
      return res.status(404).send({ error: "Película no encontrada" });
    }

    res.json(film.Actors);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const getFilmsActors = async (req, res) => {
  try {
    const films = await Film.findAll({
      include: [
        {
          model: Actor,
          through: { attributes: [] },
        },
      ],
    });

    if (films.length === 0) {
      return res.status(404).send({ error: "No se encontraron películas" });
    }

    res.json(films);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

module.exports = {
  getAllFilms,
  createFilm,
  getFilmsActors,
  getFilmById,
  getFilmActors,
  updateFilm,
  deleteFilm,
};
