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

/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: Operaciones relacionadas con películas
 */

/**
 * @swagger
 * /films:
 *   get:
 *     summary: Obtiene todas las películas
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", getAllFilms);

/**
 * @swagger
 * /films:
 *   post:
 *     summary: Crea una nueva película
 *     tags: [Películas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmInput'
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", createFilm);

/**
 * @swagger
 * /films/actors:
 *   get:
 *     summary: Obtiene todas las películas con sus actores
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas con sus actores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Film'
 *                   - type: object
 *                     properties:
 *                       Actors:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Actor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/actors", getFilmsActors);

/**
 * @swagger
 * /films/{filmId}:
 *   get:
 *     summary: Obtiene una película por su ID
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: filmId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la película
 *     responses:
 *       200:
 *         description: Película encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:filmId", getFilmById);

/**
 * @swagger
 * /films/{filmId}/actors:
 *   get:
 *     summary: Obtiene los actores de una película específica
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: filmId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la película
 *     responses:
 *       200:
 *         description: Actores de la película obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:filmId/actors", getFilmActors);

/**
 * @swagger
 * /films/{filmId}:
 *   put:
 *     summary: Actualiza una película existente
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: filmId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la película
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmInput'
 *     responses:
 *       200:
 *         description: Película actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put("/:filmId", updateFilm);

/**
 * @swagger
 * /films/{filmId}:
 *   delete:
 *     summary: Elimina una película
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: filmId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la película
 *     responses:
 *       204:
 *         description: Película eliminada exitosamente
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/:filmId", deleteFilm);

module.exports = router;
