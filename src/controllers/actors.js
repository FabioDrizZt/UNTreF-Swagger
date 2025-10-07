const Actor = require("../models/Actor");
const Film = require("../models/Film");

const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll();
    if (actors.length > 0) {
      res.json(actors);
    } else {
      res.status(404).send({ error: "No se encontraron actores para listar" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const getActorById = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if (actor) {
      res.json(actor);
    } else {
      res.status(404).send({ error: "Actor no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const createActor = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
      return res
        .status(400)
        .send({ error: "Los campos first_name y last_name son requeridos" });
    }
    const newActor = await Actor.create({ first_name, last_name });
    res.status(201).json(newActor);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const createBulkActors = async (req, res) => {
  try {
    const actors = req.body;
    if (!Array.isArray(actors) || actors.length === 0) {
      return res.status(400).send({ error: "Se requiere un array de actores" });
    }

    for (const actor of actors) {
      if (!actor.first_name || !actor.last_name) {
        return res.status(400).send({
          error: "Todos los actores deben tener first_name y last_name",
        });
      }
    }

    const newActors = await Actor.bulkCreate(actors);
    res.status(201).json(newActors);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;

    const actor = await Actor.findByPk(id);
    if (!actor) {
      return res.status(404).send({ error: "Actor no encontrado" });
    }

    await actor.update({ first_name, last_name });
    res.json(actor);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const deleteActor = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id);
    if (!actor) {
      return res.status(404).send({ error: "Actor no encontrado" });
    }

    await actor.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const getActorFilms = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByPk(id, {
      include: [
        {
          model: Film,
          through: { attributes: [] },
        },
      ],
    });

    if (!actor) {
      return res.status(404).send({ error: "Actor no encontrado" });
    }

    res.json(actor.Films);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

const getActorsFilms = async (req, res) => {
  try {
    const actors = await Actor.findAll({
      include: [
        {
          model: Film,
          through: { attributes: [] },
        },
      ],
    });

    if (actors.length === 0) {
      return res.status(404).send({ error: "No se encontraron actores" });
    }

    res.json(actors);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error en el servidor", description: error.message });
  }
};

module.exports = {
  getAllActors,
  getActorsFilms,
  createBulkActors,
  createActor,
  getActorById,
  getActorFilms,
  updateActor,
  deleteActor,
};
