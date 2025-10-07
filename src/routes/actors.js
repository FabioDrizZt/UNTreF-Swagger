const express = require("express");
const router = express.Router();
const {
  getAllActors,
  getActorsFilms,
  createBulkActors,
  createActor,
  getActorById,
  getActorFilms,
  updateActor,
  deleteActor,
} = require("../controllers/actors");

/**
 * @swagger
 * tags:
 *   name: Actores
 *   description: Operaciones relacionadas con actores
 */

/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Obtiene todos los actores
 *     tags: [Actores]
 *     responses:
 *       200:
 *         description: Lista de actores obtenida exitosamente
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
router.get("/", getAllActors);

/**
 * @swagger
 * /actors/films:
 *   get:
 *     summary: Obtiene todos los actores con sus películas
 *     tags: [Actores]
 *     responses:
 *       200:
 *         description: Lista de actores con sus películas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Actor'
 *                   - type: object
 *                     properties:
 *                       Films:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Film'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/films", getActorsFilms);

/**
 * @swagger
 * /actors/bulk:
 *   post:
 *     summary: Crea múltiples actores en una sola operación
 *     tags: [Actores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/ActorInput'
 *           example:
 *             - first_name: "Leonardo"
 *               last_name: "DiCaprio"
 *             - first_name: "Brad"
 *               last_name: "Pitt"
 *     responses:
 *       201:
 *         description: Actores creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/bulk", createBulkActors);

/**
 * @swagger
 * /actors:
 *   post:
 *     summary: Crea un nuevo actor
 *     tags: [Actores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActorInput'
 *     responses:
 *       201:
 *         description: Actor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", createActor);

/**
 * @swagger
 * /actors/{actorId}:
 *   get:
 *     summary: Obtiene un actor por su ID
 *     tags: [Actores]
 *     parameters:
 *       - in: path
 *         name: actorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del actor
 *     responses:
 *       200:
 *         description: Actor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:actorId", getActorById);

/**
 * @swagger
 * /actors/{actorId}/films:
 *   get:
 *     summary: Obtiene las películas de un actor específico
 *     tags: [Actores]
 *     parameters:
 *       - in: path
 *         name: actorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del actor
 *     responses:
 *       200:
 *         description: Películas del actor obtenidas exitosamente
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
router.get("/:actorId/films", getActorFilms);

/**
 * @swagger
 * /actors/{actorId}:
 *   put:
 *     summary: Actualiza un actor existente
 *     tags: [Actores]
 *     parameters:
 *       - in: path
 *         name: actorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del actor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActorInput'
 *     responses:
 *       200:
 *         description: Actor actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put("/:actorId", updateActor);

/**
 * @swagger
 * /actors/{actorId}:
 *   delete:
 *     summary: Elimina un actor
 *     tags: [Actores]
 *     parameters:
 *       - in: path
 *         name: actorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del actor
 *     responses:
 *       204:
 *         description: Actor eliminado exitosamente
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/:actorId", deleteActor);

module.exports = router;
