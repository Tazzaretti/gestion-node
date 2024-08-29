const express = require('express');
const router = express.Router();
const cClientes = require('./controller');
const { auth, checkAdmin } = require('../../middlewares');


router.get('/clientes', auth, cClientes.getLista);


module.exports = router
