const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, checkAcceso } = require('../../middlewares');


router.get('/localidades/getByProvincias/:idProvincia', auth, controller.getLocalidadesProvincias);


module.exports = router