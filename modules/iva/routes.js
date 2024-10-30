const express = require('express');
const router = express.Router();
const cIva = require('./controller');
const { auth, checkAdmin } = require('../../middlewares');


router.get('/condiciones_iva', auth, cIva.getAll);


module.exports = router