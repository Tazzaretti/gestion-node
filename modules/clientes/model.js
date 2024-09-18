const {queryMYSQL} = require("../../database");

exports.getAll = async function ({activo = null, provincia = null, localidad = null} = {}) {
    params = [];
    let query = `
        select c.*, p.nombre as provincia, l.nombre as localidad, l.id_provincia_fk
        from clientes c
        left join localidades l on c.id_localidad_fk = l.id 
        left join provincias p on p.id = l.id_provincia_fk  WHERE 1=1`;
    
    if (activo !== "t" && activo !== null) {
        query += `AND c.activo = ?`
        params.push(activo)
    }

    if (provincia && provincia != "t"){
        query += `AND l.id_provincia_fk = ?`
        params.push(provincia)
    }

    if (localidad != null && localidad != "t"){
        query += `AND c.id_localidad_fk = ?`
        params.push(localidad)
    }
    return await queryMYSQL(query, params);
};

exports.insert = async (nombre, domicilio, telefonos, email, cuit, id_iva_fk, dni, razon_social, id_localidad_fk) => {
    let params = [nombre, domicilio, telefonos, email, cuit, id_iva_fk, dni, razon_social, id_localidad_fk]
    return queryMYSQL(`
        INSERT INTO clientes(nombre, domicilio, telefonos, email, cuit, id_iva_fk, dni, razon_social, id_localidad_fk, activo, alta)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW())`
        ,params
    )
}


exports.getClienteById = async (id) => {
    return queryMYSQL(`
        SELECT c.*, l.nombre as nombre_localidad, p.nombre as nombre_provincia
        FROM clientes c
        LEFT JOIN localidades l on l.id = c.id_localidad_fk 
        LEFT JOIN provincias p on l.id_provincia_fk = p.id
        WHERE c.id = ?`, [id]);
}