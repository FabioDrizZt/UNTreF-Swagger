const express = require("express");
const router = express.Router();
const {
  getAllFilms,
  createFilm,
  getFilmsActors,
  getFilmById,
  getFilmActors,
  updateFilm,
  deleteFilm,
} = require("../controllers/films");

router.get("/", getAllFilms);
router.post("/", createFilm);
router.get("/actors", getFilmsActors);
router.get("/:filmId", getFilmById);
router.get("/:filmId/actors", getFilmActors);
router.put("/:filmId", updateFilm);
router.delete("/:filmId", deleteFilm);

module.exports = router;
