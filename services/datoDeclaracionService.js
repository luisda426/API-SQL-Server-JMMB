const { sql } = require("../config/database");

const guardarDeclaracion = async (
  transaction,
  idSolicitud,
  datosDeclaracion,
) => {
  const request = new sql.Request(transaction);

  await request

    .input("IdSolicitud", sql.Int, idSolicitud)

    .input("DeclaracionJurada", sql.Bit, datosDeclaracion.declaracionJurada)
    .query(`
            INSERT INTO DatoDeclaracion
            (
                IdSolicitud,
                DeclaracionJurada
            )
            VALUES
            (
                @IdSolicitud,
                @DeclaracionJurada
            )
        `);
};

module.exports = {
  guardarDeclaracion,
};
