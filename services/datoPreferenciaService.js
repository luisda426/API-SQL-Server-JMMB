const { sql } = require("../config/database");

const guardarDatoPreferencia = async (
  transaction,
  idSolicitud,
  datosPreferencias,
) => {
  // ==========================================
  // 1. GUARDAR DATO PREFERENCIA
  // ==========================================

  const request = new sql.Request(transaction);

  await request
    .input("IdSolicitud", sql.Int, idSolicitud)
    .input(
      "OficinaPreferencia",
      sql.NVarChar,
      datosPreferencias.oficinaPreferencia,
    )
    .input("PrimeraVez", sql.Bit, datosPreferencias.primeraVez).query(`
      INSERT INTO DatoPreferencia
      (
        IdSolicitud,
        BuroCredito,
        OficinaPreferencia,
        PrimeraVez
      )
      VALUES
      (
        @IdSolicitud,
        @BuroCredito,
        @OficinaPreferencia,
        @PrimeraVez
      )
    `);

  // ==========================================
  // 2. GUARDAR ENTIDADES DONDE YA ES CLIENTE
  // ==========================================

  if (Array.isArray(datosPreferencias.entidadesCliente)) {
    for (const entidad of datosPreferencias.entidadesCliente) {
      const entidadRequest = new sql.Request(transaction);

      await entidadRequest
        .input("IdSolicitud", sql.Int, idSolicitud)
        .input("Entidad", sql.NVarChar, entidad)
        .input("TipoRelacion", sql.NVarChar, "Cliente").query(`
          INSERT INTO PreferenciaEntidad
          (
            IdSolicitud,
            Entidad,
            TipoRelacion
          )
          VALUES
          (
            @IdSolicitud,
            @Entidad,
            @TipoRelacion
          )
        `);
    }
  }

  // ==========================================
  // 3. GUARDAR INSTITUCIONES A VINCULAR
  // ==========================================

  if (Array.isArray(datosPreferencias.institucionesVincular)) {
    for (const entidad of datosPreferencias.institucionesVincular) {
      const entidadRequest = new sql.Request(transaction);

      await entidadRequest
        .input("IdSolicitud", sql.Int, idSolicitud)
        .input("Entidad", sql.NVarChar, entidad)
        .input("TipoRelacion", sql.NVarChar, "Vincular").query(`
          INSERT INTO PreferenciaEntidad
          (
            IdSolicitud,
            Entidad,
            TipoRelacion
          )
          VALUES
          (
            @IdSolicitud,
            @Entidad,
            @TipoRelacion
          )
        `);
    }
  }
};

module.exports = {
  guardarDatoPreferencia,
};
