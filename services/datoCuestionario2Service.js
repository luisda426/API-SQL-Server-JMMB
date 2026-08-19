const { sql } = require("../config/database");

const guardarDatoCuestionario2 = async (
  transaction,
  idSolicitud,
  datosCuestionario2,
) => {
  const request = new sql.Request(transaction);

  await request

    .input("IdSolicitud", sql.Int, idSolicitud)

    .input("IngresosAnuales", sql.NVarChar, datosCuestionario2.ingresosAnuales)

    .input("CapacidadAhorro", sql.NVarChar, datosCuestionario2.capacidadAhorro)

    .input(
      "TotalActivosLiquidos",
      sql.NVarChar,
      datosCuestionario2.totalActivosLiquidos,
    )

    .input(
      "CuentaAhorroCorriente",
      sql.NVarChar,
      datosCuestionario2.cuentaAhorroCorriente,
    )

    .input("PatrimonioTotal", sql.NVarChar, datosCuestionario2.patrimonioTotal)

    .input(
      "ObligacionesDeudas",
      sql.NVarChar,
      datosCuestionario2.obligacionesDeudas,
    )

    .input("Banco1", sql.NVarChar, datosCuestionario2.banco1)

    .input("TipoCuenta1", sql.NVarChar, datosCuestionario2.tipoCuenta1)

    .input("TelefonoBanco1", sql.NVarChar, datosCuestionario2.telefonoBanco1)

    .input("OficialBanco1", sql.NVarChar, datosCuestionario2.oficialBanco1)

    .input("Banco2", sql.NVarChar, datosCuestionario2.banco2)

    .input("TipoCuenta2", sql.NVarChar, datosCuestionario2.tipoCuenta2)

    .input("TelefonoBanco2", sql.NVarChar, datosCuestionario2.telefonoBanco2)

    .input("OficialBanco2", sql.NVarChar, datosCuestionario2.oficialBanco2)

    .input(
      "PatrimonioPeriodo1",
      sql.NVarChar,
      datosCuestionario2.patrimonioPeriodo1,
    )

    .input(
      "PatrimonioPeriodo2",
      sql.NVarChar,
      datosCuestionario2.patrimonioPeriodo2,
    )

    .input("PasivosPeriodo1", sql.NVarChar, datosCuestionario2.pasivosPeriodo1)

    .input("PasivosPeriodo2", sql.NVarChar, datosCuestionario2.pasivosPeriodo2)
    .query(`
            INSERT INTO DatoCuestionario2
            (
                IdSolicitud,
                IngresosAnuales,
                CapacidadAhorro,
                TotalActivosLiquidos,
                CuentaAhorroCorriente,
                PatrimonioTotal,
                ObligacionesDeudas,

                Banco1,
                TipoCuenta1,
                TelefonoBanco1,
                OficialBanco1,

                Banco2,
                TipoCuenta2,
                TelefonoBanco2,
                OficialBanco2,

                PatrimonioPeriodo1,
                PatrimonioPeriodo2,
                PasivosPeriodo1,
                PasivosPeriodo2
            )
            VALUES
            (
                @IdSolicitud,
                @IngresosAnuales,
                @CapacidadAhorro,
                @TotalActivosLiquidos,
                @CuentaAhorroCorriente,
                @PatrimonioTotal,
                @ObligacionesDeudas,

                @Banco1,
                @TipoCuenta1,
                @TelefonoBanco1,
                @OficialBanco1,

                @Banco2,
                @TipoCuenta2,
                @TelefonoBanco2,
                @OficialBanco2,

                @PatrimonioPeriodo1,
                @PatrimonioPeriodo2,
                @PasivosPeriodo1,
                @PasivosPeriodo2
            )
        `);
};

module.exports = {
  guardarDatoCuestionario2,
};
