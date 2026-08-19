const { sql } = require("../config/database");

const guardarDatoPep = async (request, idSolicitud, datosPep) => {
  console.log("Entrando a guardarDatoPep");
  console.log("IdSolicitud:", idSolicitud);
  console.log(datosPep);

  await request

    .input("IdSolicitud", sql.Int, idSolicitud)

    .input("EsPEP", sql.Bit, datosPep.esPEP)

    .input("CargoPEP", sql.NVarChar, datosPep.cargoPEP)

    .input("PaisPEP", sql.NVarChar, datosPep.paisPEP)

    .input("FechaDesignacionPEP", sql.Date, datosPep.fechaDesignacionPEP)

    .input("FechaRemocionPEP", sql.Date, datosPep.fechaRemocionPEP)

    .input("RelacionPEP", sql.Bit, datosPep.relacionPEP)

    .input("NombrePEP", sql.NVarChar, datosPep.nombrePEP)

    .input("PaisPEPRelacionado", sql.NVarChar, datosPep.paisPEPRelacionado)

    .input("ParentescoPEP", sql.NVarChar, datosPep.parentescoPEP)

    .input("CargoPEPRelacionado", sql.NVarChar, datosPep.cargoPEPRelacionado)

    .input(
      "FechaDesignacionPEPRelacionado",
      sql.Date,
      datosPep.fechaDesignacionPEPRelacionado,
    )

    .input(
      "FechaRemocionPEPRelacionado",
      sql.Date,
      datosPep.fechaRemocionPEPRelacionado,
    ).query(`

            INSERT INTO DatoPep
            (
                IdSolicitud,

                EsPEP,

                CargoPEP,
                PaisPEP,

                FechaDesignacionPEP,
                FechaRemocionPEP,

                RelacionPEP,

                NombrePEP,
                PaisPEPRelacionado,
                ParentescoPEP,

                CargoPEPRelacionado,

                FechaDesignacionPEPRelacionado,
                FechaRemocionPEPRelacionado
            )

            VALUES
            (
                @IdSolicitud,

                @EsPEP,

                @CargoPEP,
                @PaisPEP,

                @FechaDesignacionPEP,
                @FechaRemocionPEP,

                @RelacionPEP,

                @NombrePEP,
                @PaisPEPRelacionado,
                @ParentescoPEP,

                @CargoPEPRelacionado,

                @FechaDesignacionPEPRelacionado,
                @FechaRemocionPEPRelacionado
            )

        `);
};

module.exports = {
  guardarDatoPep,
};
