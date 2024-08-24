const {queryMYSQL} = require("../../database");

exports.getAll = () => {
    return queryMYSQL(`SELECT * FROM secr`);
};

exports.getById = (id_usuario) => {
    return queryMYSQL(`SELECT * FROM secr WHERE unica = ?`, [id_usuario]);
};

exports.getByName = (usuario) => {
    return queryMYSQL(`SELECT * FROM secr WHERE usuario = ?`, [usuario]);
};

exports.insert = (usuario, mail, clave, niveles) => {
    params = [usuario, mail, clave, niveles]
    return queryMYSQL(`
        INSERT INTO secr (usuario, mail, clave, activa, alta, niveles) 
        VALUES ( ?, ?, ?, 1, NOW(), ?)`
        , params
    );
};


exports.getModuloByRute = (ruta) => {
    return queryMYSQL(`SELECT * FROM pantallas WHERE ruta = ?`, [ruta]);
};

exports.VerificarNivelAdministracion = (id_usuario) => {
    let unica = [id_usuario]
    return queryMYSQL(`
        SELECT * FROM secr WHERE unica = ? AND niveles = "Administrador"
        `, unica)
};

exports.verificarAcceso = (id_usuario, id_menu, permiso) => {
    let params = [id_usuario, id_menu]
    return queryMYSQL(
        "SELECT" + permiso + "FROM secr2 WHERE unica = ? AND menu = ?", 
        params);
};

exports.verificarAccesosAll = (id_usuario, id_menu) => {
    let params = [id_usuario, id_menu];
    return queryMYSQL(
        `SELECT * FROM secr2 WHERE unica = ? AND menu = ?`, params);
};


exports.getModuloByRuta = (ruta) => {
    return queryMYSQL(`
        SELECT * FROM pantallas WHERE ruta = ?
        `, [ruta]);
};

