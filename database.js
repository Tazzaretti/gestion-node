const MYSQL = require("mysql2");

// Pools

//MYSQL

let connectionMYSQL = null;


const configMYSQL = {
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    host: process.env.DB_MYSQL_SERVER,
    port: process.env.DB_MYSQL_PORT || 3306,
    database: process.env.DB_MYSQL_NAME,
    dateStrings: true
}

//Inicializar el pool, se llama una sola vez desde app.js al iniciar el server
exports.initConnectionMYSQL = () => {
    return new Promise(async(resolve, reject) => {
        try{
            connectionMYSQL = await MYSQL.createPool(configMYSQL)
            resolve()
        } catch (er) {
            reject(er)
        }
    })
}


//Por si se requiere el objeto pool directamente
exports.getConnectionMYSQL = () => {
    return connectionMYSQL;
}


/**
 * 
 * @param {string} sqlStr String sql. Utilizar placeholders '?' para insertar los parámetros. ejemplo: select * from tab where campo = ? and campo2 = ?
 * @param {array} params Array de valores. ejemplo: ['abc', 123, 'hola']. Deben estar en orden.
 * @param {string} nombreConexion Nombre de la conexión, determina qué base usar. (ventam o copermat)
 * @param {boolean} debug Si es true se logueará la consulta sql y los parámetros.
 * @param {boolean} completeResult Si es true devuelve un objeto con el recordset, output y rowsAffected. Si es false solo devuelve el recordset.
 * @returns Devuelve una promise con los resultados o el error
 */


exports.queryMYSQL = (sqlStr, params) => {
    return new Promise((resolve, reject) => {
        connectionMYSQL.query(sqlStr, params, (err, rows, fields) => {
            if (err) reject(err)
            else resolve(rows)
        })
    })
}