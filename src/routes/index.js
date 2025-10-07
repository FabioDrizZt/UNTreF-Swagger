const express = require("express");
const router = express.Router();

const filmRoutes = require("./films");
const actorRoutes = require("./actors");

router.use("/films", filmRoutes);
router.use("/actors", actorRoutes);

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bienvenido a la API de Sakila",
    version: "1.0.0",
    endpoints: {
      actors: "/api/v1/actors",
      films: "/api/v1/films",
    },
    examples: {
      actors: {
        "Obtener todos los actores": "GET /api/v1/actors",
        "Obtener actor por ID": "GET /api/v1/actors/:actorId",
        "Crear nuevo actor": "POST /api/v1/actors",
        "Crear múltiples actores": "POST /api/v1/actors/bulk",
        "Actualizar actor": "PUT /api/v1/actors/:actorId",
        "Eliminar actor": "DELETE /api/v1/actors/:actorId",
        "Obtener películas de un actor": "GET /api/v1/actors/:actorId/films",
        "Obtener todos los actores con sus películas":
          "GET /api/v1/actors/films",
      },
      films: {
        "Obtener todas las películas": "GET /api/v1/films",
        "Obtener película por ID": "GET /api/v1/films/:filmId",
        "Crear nueva película": "POST /api/v1/films",
        "Actualizar película": "PUT /api/v1/films/:filmId",
        "Eliminar película": "DELETE /api/v1/films/:filmId",
        "Obtener actores de una película": "GET /api/v1/films/:filmId/actors",
        "Obtener todas las películas con sus actores":
          "GET /api/v1/films/actors",
      },
    },
  });
});

module.exports = router;
