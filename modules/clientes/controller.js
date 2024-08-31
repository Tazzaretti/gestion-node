const mClientes = require("./model");
const mProvincias = require("../provincias/model");



exports.getLista = async (req, res) => {
    //const {id} = req.session.user;
    const provincias = await mProvincias.getAllProvincias();
    res.render("clientes/views/lista", {
        pagename: "Clientes",
        provincias
        //unica: id,
    });
};