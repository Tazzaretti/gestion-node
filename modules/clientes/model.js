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

exports.insert = async ( cliente ) => {
    return await queryMYSQL(`
        INSERT INTO clientes(nombre, razon_social, email, cuit, telefonos, dni, id_iva_fk, id_localidad_fk, domicilio, activo, alta)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`
        , [cliente.nombre, cliente.razon_social, cliente.email, cliente.cuit, cliente.telefono, cliente.dni, 1, cliente.localidad, cliente.direccion, cliente.activo]
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

exports.checkExist = async ({dni = null, email = null, cuit = null} = {}) => {
    let params = [dni, email, cuit];
    let query = "SELECT * FROM clientes WHERE ( dni = ? OR email = ? OR cuit = ? );"

    return queryMYSQL(query, params);
};