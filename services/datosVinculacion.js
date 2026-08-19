const { sql, config } = require("../config/database");

async function guardarVinculacionCliente(idSolicitud, datos) {
  const pool = await sql.connect(config);

  await pool
    .request()
    .input("IdSolicitud", sql.Int, idSolicitud)

    .input("TipoCliente", sql.NVarChar(100), datos.tipoCliente)

    .input("VinculacionMancomunada", sql.Bit, datos.vinculacionMancomunada)

    .input(
      "DuracionRelacion",
      sql.NVarChar(150),
      datos.duracionRelacion || null,
    )

    .input("RelacionCaraCara", sql.Bit, datos.relacionCaraCara)

    .input("ResumenCliente", sql.NVarChar(500), datos.resumenCliente)

    .input("ProductoAjustado", sql.Bit, datos.productoAjustado)

    .input("ActivosLiquidos25M", sql.Bit, datos.activosLiquidos25M)

    .input(
      "TipoClienteProspecto",
      sql.NVarChar(100),
      datos.tipoClienteProspecto,
    )

    .input("Tolerancia", sql.NVarChar(100), datos.tolerancia)

    .input("Bancarizacion", sql.NVarChar(100), datos.bancarizacion).query(`
      INSERT INTO DatosVinculacion
      (
        IdSolicitud,
        TipoCliente,
        VinculacionMancomunada,
        DuracionRelacion,
        RelacionCaraCara,
        ResumenCliente,
        ProductoAjustado,
        ActivosLiquidos25M,
        TipoClienteProspecto,
        Tolerancia,
        Bancarizacion
      )
      VALUES
      (
        @IdSolicitud,
        @TipoCliente,
        @VinculacionMancomunada,
        @DuracionRelacion,
        @RelacionCaraCara,
        @ResumenCliente,
        @ProductoAjustado,
        @ActivosLiquidos25M,
        @TipoClienteProspecto,
        @Tolerancia,
        @Bancarizacion
      )
    `);

  // ==========================================
  // ACTUALIZAR ESTADO DE LA SOLICITUD
  // ==========================================

  await pool
    .request()
    .input("IdSolicitud", sql.Int, idSolicitud)
    .input("Estado", sql.NVarChar(50), "Completado").query(`
      UPDATE dbo.Solicitud
      SET
        Estado = @Estado,
        FechaActualizacion = SYSDATETIME()
      WHERE IdSolicitud = @IdSolicitud
    `);
}

module.exports = {
  guardarVinculacionCliente,
};
