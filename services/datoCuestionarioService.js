const { sql } = require("../config/database");

const guardarDatoCuestionario = async (
  transaction,
  idSolicitud,
  datosCuestionario,
) => {
  // ==========================================
  // 1. GUARDAR DATOS DEL CUESTIONARIO
  // ==========================================

  const request = new sql.Request(transaction);

  await request
    .input("IdSolicitud", sql.Int, idSolicitud)

    .input(
      "EdadInversionista",
      sql.NVarChar,
      datosCuestionario.edadInversionista,
    )

    .input("ObjetivoCapital", sql.NVarChar, datosCuestionario.objetivoCapital)

    .input("CriterioRiesgo", sql.NVarChar, datosCuestionario.criterioRiesgo)

    .input("NivelAcademico", sql.NVarChar, datosCuestionario.nivelAcademico)

    .input("OtrosDerivados", sql.NVarChar, datosCuestionario.otrosDerivados)

    .input("PlazoObjetivos", sql.NVarChar, datosCuestionario.plazoObjetivos)

    .input(
      "PlazoNecesidadInversion",
      sql.NVarChar,
      datosCuestionario.plazoNecesidadInversion,
    )

    .input(
      "CapacidadPerdidas",
      sql.NVarChar,
      datosCuestionario.capacidadPerdidas,
    ).query(`
            INSERT INTO DatoCuestionario
            (
                IdSolicitud,
                EdadInversionista,
                ObjetivoCapital,
                CriterioRiesgo,
                NivelAcademico,
                OtrosDerivados,
                PlazoObjetivos,
                PlazoNecesidadInversion,
                CapacidadPerdidas
            )
            VALUES
            (
                @IdSolicitud,
                @EdadInversionista,
                @ObjetivoCapital,
                @CriterioRiesgo,
                @NivelAcademico,
                @OtrosDerivados,
                @PlazoObjetivos,
                @PlazoNecesidadInversion,
                @CapacidadPerdidas
            )
        `);

  // ==========================================
  // 2. GUARDAR OPERACIONES FINANCIERAS
  // ==========================================

  if (Array.isArray(datosCuestionario.operacionesFinancieras)) {
    for (const operacion of datosCuestionario.operacionesFinancieras) {
      // Request nuevo para cada operación
      const operacionRequest = new sql.Request(transaction);

      await operacionRequest

        .input("IdSolicitud", sql.Int, idSolicitud)

        .input("Operacion", sql.NVarChar, operacion).query(`
                    INSERT INTO OperacionFinanciera
                    (
                        IdSolicitud,
                        Operacion
                    )
                    VALUES
                    (
                        @IdSolicitud,
                        @Operacion
                    )
                `);
    }
  }
};

module.exports = {
  guardarDatoCuestionario,
};
