const model = require('./model');


exports.getLocalidadesProvincias = async (req, res) => {
    console.log(req.params.idProvincia)
    const localidades = await model.getLocalidadesByIdProvincia(req.params.idProvincia)
    res.json(localidades)
}