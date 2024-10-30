const { queryMYSQL } = require("../../database");

exports.getAll = async ({activo = null, id_rubro_fk = null} = {}) => {
    
    params = [];
    let query = "SELECT * FROM articulos WHERE 1=1"
    
    if(id_rubro_fk !== null && id_rubro_fk !== "t"){
        query += "AND id_rubro_fk = ?";
        params.push(id_rubro_fk);
    }

    if(activo !== null && activo !== "t"){
        query += "AND activo = ?";
        params.push(activo);
    }

    return queryMYSQL(query, params);
};

exports.getById = async (id) => {
    return queryMYSQL(`SELECT * FROM articulos WHERE id = ?`, [id]);
};