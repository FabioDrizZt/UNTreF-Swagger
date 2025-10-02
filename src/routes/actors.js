const express = require('express');
const router = express.Router();
const { getAllActors } = require('../controllers/actors');

router.get('/', getAllActors);

module.exports = router;