const { queryMSSQL, queryMYSQL } = require("../../database");

exports.getAllLocalidades = () => {
  return queryMYSQL(`SELECT * FROM localidades`);
};

exports.getLocalidadesByIdProvincia = (idProvincia) => {
  return queryMYSQL(
    `
        SELECT * 
        FROM localidades
        WHERE id_provincia_fk = ?
    `,
    [idProvincia]
  );
};
