const mClientes = require("./model");

exports.getLista = async (req, res) => {
    const clientes = await mClientes.getAll();
    //const {id} = req.session.user;
    res.render("clientes/views/lista", {
        pagename: "Clientes",
        clientes,
        //unica: id,
    });
};