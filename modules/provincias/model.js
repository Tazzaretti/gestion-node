const {queryMYSQL} = require("../../database");

exports.getAllProvincias = () => {
    return queryMYSQL(`SELECT * FROM provincias`);
}