const mClientes = require("./model");
const mProvincias = require("../provincias/model");
const { validateEmail, validarCuitConGuiones } = require("../../utils");



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

exports.getById = async (req, res) => {
    let id = req.params.id
    console.log(id)

    let cliente = await mClientes.getClienteById(id);
    console.log(cliente[0])

    res.json(cliente[0]);
}

exports.postAlta = async (req, res) => {
    try{
        let cliente = req.body;

        if(!cliente.nombre){
            res.json({
                type: "error",
                title: "Error",
                text: "Debe ingresar un nombre!"
            });
        };

        if(!cliente.razon_social){
            res.json({
                type: "error",
                title: "Error",
                text: "Debe ingresar una razon social!"
            });
        };

        if(!cliente.email){
            res.json({
                type: "error",
                title: "Error",
                text: "Debe ingresar un email!"
            });
        };

        if(!validateEmail(cliente.email)){
            res.json({
                type: "error",
                title: "Error",
                text: "El email ingresado no es valido."
            });
        };

        if(!cliente.cuit){
            res.json({
                type: "error",
                title: "Error",
                text: "El campo cuit es obligatorio."
            });
        };

        if(!validarCuitConGuiones(cliente.cuit)){
            res.json({
                type: "error",
                title: "Error",
                text: "El cuit ingresado no es valido."
            });
        };

        if(!cliente.telefono){
            res.json({
                type: "error",
                title: "Error",
                text: "El campo telefono es obligatorio"
            });
        };

        if(!cliente.dni){
            res.json({
                type: "error",
                title: "Error",
                text: "El campo DNI es obligatorio."
            });
        };

        if(!cliente.provincia){
            res.json({
                type: "error",
                title: "Error",
                text: "Debe seleccionar una provincia"
            });
        };

        if(!cliente.localidad){
            res.json({
                type: "error",
                title: "Error",
                text: "Debe seleccionar una localidad"
            });
        };

        if(!cliente.direccion){
            res.json({
                type: "error",
                title:"Error",
                text: "El campo direccion es obligatorio."
            });
        };

        let clienteExist = await mClientes.checkExist({
            dni: cliente.dni,
            email: cliente.email,
            cuit: cliente.cuit
        });

        if(clienteExist.length > 0) {
            res.json({
                type: "error",
                title: "Error",
                text: 
                    clienteExist[0].dni == cliente.dni ? "El DNI ingresado pertenece a un cliente existente." 
                    : clienteExist[0].email == cliente.email ? "El email ingresado pertenece a un cliente existente." 
                    : "El CUIT ingresado pertenece a un cliente existente.",
            });
        };



        const res = await mClientes.insert(cliente);

        if( res.affectedRows === 0)
            return res.json({type: "error", title: "Error", text: "Ocurrió un error al procesar la solicitud."});



        // INSERTAR EVENTOSSSSSSSSSSSSSSSSS

        res.json({status: true, type: "success", title: "Éxito", text: "Cliente dado de alta correctamente."})

    } catch (err) {

    }
}