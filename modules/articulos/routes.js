const express = require('express');
const router = express.Router();
const cArticulos = require('./controller');
const { auth, checkAdmin } = require('../../middlewares');

router.get('/articulos', auth, cArticulos.getLista);
router.get('/articulos/:id', auth, cArticulos.getById);
module.exports = router;