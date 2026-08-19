const { sql } = require("../config/database");

const guardarDatoLaboral = async (request, idSolicitud, datosLaborales) => {
  console.log("Entrando a guardarDatoLaboral");
  console.log("IdSolicitud:", idSolicitud);
  console.log(datosLaborales);

  await request

    .input("IdSolicitud", sql.Int, idSolicitud)

    .input("Empresa", sql.NVarChar, datosLaborales.empresa)
    .input("DireccionEmpresa", sql.NVarChar, datosLaborales.direccionEmpresa)

    .input("Ciudad", sql.NVarChar, datosLaborales.ciudad)
    .input("Sector", sql.NVarChar, datosLaborales.sector)
    .input("Pais", sql.NVarChar, datosLaborales.pais)

    .input("Cargo", sql.NVarChar, datosLaborales.cargo)

    .input("FechaIngreso", sql.Date, datosLaborales.ingreso)

    .input("Telefono", sql.NVarChar, datosLaborales.telefono)

    .input("Email", sql.NVarChar, datosLaborales.email)

    .input("Comentarios", sql.NVarChar, datosLaborales.comentarios).query(`

            INSERT INTO DatoLaboral
            (
                IdSolicitud,
                Empresa,
                DireccionEmpresa,
                Ciudad,
                Sector,
                Pais,
                Cargo,
                FechaIngreso,
                Telefono,
                Email,
                Comentarios
            )

            VALUES
            (
                @IdSolicitud,
                @Empresa,
                @DireccionEmpresa,
                @Ciudad,
                @Sector,
                @Pais,
                @Cargo,
                @FechaIngreso,
                @Telefono,
                @Email,
                @Comentarios
            )

        `);
};

module.exports = {
  guardarDatoLaboral,
};
