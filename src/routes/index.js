const express = require('express');
const router = express.Router();

const filmRoutes = require('./films');
const actorRoutes = require('./actors');

router.use('/films', filmRoutes)
router.use('/actors', actorRoutes)

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bienvenido a la API de Sakila",
    version: "1.0.0",
    endpoints: {
      actors: "/api/v1/actors",
      films: "/api/v1/films",
    },
    examples: {
      getAllActors: "GET /api/v1/actors",
      searchActors: "GET /api/v1/actors?search=John",
      getActorById: "GET /api/v1/actors/1",
      getActorFilms: "GET /api/v1/actors/1/films",
      getAllFilms: "GET /api/v1/films",
      searchFilms: "GET /api/v1/films/search?q=Matrix",
      getFilmStats: "GET /api/v1/films/stats",
      getFilmById: "GET /api/v1/films/1"
    }
  });
});

module.exports = router;