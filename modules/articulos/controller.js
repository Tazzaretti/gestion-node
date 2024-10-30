const mArticulos = require('./model');

exports.getLista = async (req, res) => {
    let activo = req.body.activo;
    let rubro = req.body.id_rubro_fk;
    const articulos = await mArticulos.getAll(activo, rubro);
    console.log(articulos);
    res.render("articulos/views/lista", {
        pagename: "Articulos",
        articulos
    });
};

exports.getById = async (req, res) => {
    const articulo = await mArticulos.getById(req.params.id)

    res.json(articulo[0]);
}