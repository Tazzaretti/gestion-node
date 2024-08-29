const {queryMYSQL} = require("../../database");

exports.getAll = () => {
    return queryMYSQL(`SELECT * FROM clientes`)
};

exports.insert = async (nombre, domicilio, telefonos, email, cuit, id_iva_fk, dni, razon_social, id_localidad_fk) => {
    let params = [nombre, domicilio, telefonos, email, cuit, id_iva_fk, dni, razon_social, id_localidad_fk]
    return queryMYSQL(`
        INSERT INTO clientes(nombre, domicilio, telefonos, email, cuit, id_iva_fk, dni, razon_social, id_localidad_fk, activo, alta)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW())`
        ,params
    )
}