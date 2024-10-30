const {queryMYSQL} = require('../../database');

exports.getAll = async () => {
    return queryMYSQL('SELECT * FROM condicion_iva');
}