const express = require('express');
const router = express.Router();
const { getAllFilms } = require('../controllers/films');

router.get('/', getAllFilms);

module.exports = router;