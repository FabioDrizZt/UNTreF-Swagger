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

router.get("/", getAllActors);
router.get("/films", getActorsFilms);
router.post("/bulk", createBulkActors);
router.post("/", createActor);
router.get("/:actorId", getActorById);
router.get("/:actorId/films", getActorFilms);
router.put("/:actorId", updateActor);
router.delete("/:actorId", deleteActor);

module.exports = router;
