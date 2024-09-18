const express = require('express');
const router = express.Router();
const cClientes = require('./controller');
const { auth, checkAdmin } = require('../../middlewares');


router.get('/clientes', auth, cClientes.getLista);
router.post('/clientes/lista', auth, cClientes.getAll);
router.get('/clientes/:id', auth, cClientes.getById);
module.exports = router
