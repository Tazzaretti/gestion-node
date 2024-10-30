const mIva = require('./model');

exports.getAll = async (req, res) => {
    const condiciones_iva = await mIva.getAll();
    console.log(condiciones_iva);
    res.json(condiciones_iva);
}