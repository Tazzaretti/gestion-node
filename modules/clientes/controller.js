const mClientes = require("./model");
const mProvincias = require("../provincias/model");



exports.getLista = async (req, res) => {
    const provincias = await mProvincias.getAllProvincias();
    res.render("clientes/views/lista", {
        pagename: "Clientes",
        provincias
        //unica: id,
    });
};

exports.getAll = async (req, res) => {
    let {activo, provincia, localidad} = req.body;
    const clientes = await mClientes.getAll(activo, provincia, localidad);
    res.json(clientes);
}