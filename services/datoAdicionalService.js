const { sql } = require("../config/database");

async function guardarDatoAdicional(
  transaction,
  idSolicitud,
  datosAdicionales,
) {
  // ==========================================
  // DATO ADICIONAL PRINCIPAL
  // ==========================================

  const request = new sql.Request(transaction);

  await request
    .input("IdSolicitud", sql.Int, idSolicitud)

    // ==========================================
    // INVERSIONES - PUESTO USD
    // ==========================================

    .input(
      "MontoEstimadoInversionPuestoUSD",
      sql.NVarChar(100),
      datosAdicionales.montoEstimadoInversionPuestoUSD,
    )

    .input(
      "OrigenFondosPuestoUSD",
      sql.NVarChar(100),
      datosAdicionales.origenFondosPuestoUSD,
    )

    .input(
      "OtroOrigenFondosPuestoUSD",
      sql.NVarChar(100),
      datosAdicionales.otroOrigenFondosPuestoUSD,
    )

    // ==========================================
    // INVERSIONES - PUESTO RD$
    // ==========================================

    .input(
      "MontoEstimadoInversionPuestoRD",
      sql.NVarChar(100),
      datosAdicionales.montoEstimadoInversionPuestoRD,
    )

    .input(
      "OrigenFondosPuestoRD",
      sql.NVarChar(100),
      datosAdicionales.origenFondosPuestoRD,
    )

    .input(
      "OtroOrigenFondosPuestoRD",
      sql.NVarChar(100),
      datosAdicionales.otroOrigenFondosPuestoRD,
    )

    // ==========================================
    // INVERSIONES - SAFI USD
    // ==========================================

    .input(
      "MontoEstimadoInversionSafiUSD",
      sql.NVarChar(100),
      datosAdicionales.montoEstimadoInversionSafiUSD,
    )

    .input(
      "OrigenFondosSafiUSD",
      sql.NVarChar(100),
      datosAdicionales.origenFondosSafiUSD,
    )

    .input(
      "OtroOrigenFondosSafiUSD",
      sql.NVarChar(100),
      datosAdicionales.otroOrigenFondosSafiUSD,
    )

    // ==========================================
    // INVERSIONES - SAFI RD$
    // ==========================================

    .input(
      "MontoEstimadoInversionSafiRD",
      sql.NVarChar(100),
      datosAdicionales.montoEstimadoInversionSafiRD,
    )

    .input(
      "OrigenFondosSafiRD",
      sql.NVarChar(100),
      datosAdicionales.origenFondosSafiRD,
    )

    .input(
      "OtroOrigenFondosSafiRD",
      sql.NVarChar(100),
      datosAdicionales.otroOrigenFondosSafiRD,
    )

    // ==========================================
    // UCS / BANCO
    // ==========================================

    .input(
      "NumeroClienteUCS",
      sql.NVarChar(100),
      datosAdicionales.numeroClienteUCS,
    )

    .input(
      "CuentaBancoMoneda",
      sql.NVarChar(100),
      datosAdicionales.cuentaBancoMoneda,
    )

    .input("MontoPrestamo", sql.NVarChar(100), datosAdicionales.montoPrestamo)

    .input(
      "MonedaCertificado",
      sql.NVarChar(10),
      datosAdicionales.monedaCertificado,
    )

    .input(
      "MontoCertificado",
      sql.NVarChar(100),
      datosAdicionales.montoCertificado,
    )

    // ==========================================
    // DATOS ADICIONALES
    // ==========================================

    .input(
      "BeneficiariosTransaccion",
      sql.Bit,
      datosAdicionales.beneficiariosTransaccion,
    )

    .input(
      "IdentificacionBeneficiarioFinal",
      sql.NVarChar(100),
      datosAdicionales.identificacionBeneficiarioFinal,
    )

    .input(
      "FormaTransacciones",
      sql.NVarChar(200),
      datosAdicionales.formaTransacciones,
    )

    .input(
      "TipoTransferencia",
      sql.NVarChar(100),
      datosAdicionales.tipoTransferencia,
    )

    // IMPORTANTE:
    // antes era NVARCHAR y ahora es BIT
    .input(
      "PersonasRelacionadas",
      sql.Bit,
      datosAdicionales.personasRelacionadas,
    )

    .input(
      "CualesPersonasRelacionadas",
      sql.NVarChar(100),
      datosAdicionales.cualesPersonasRelacionadas,
    )

    .input("SelectVinculadoJMMB", sql.Bit, datosAdicionales.selectVinculadoJMMB)

    .input("VinculadoJMMB", sql.NVarChar(100), datosAdicionales.vinculadoJMMB)
    .query(`
      INSERT INTO DatoAdicional
      (
        IdSolicitud,

        MontoEstimadoInversionPuestoUSD,
        OrigenFondosPuestoUSD,
        OtroOrigenFondosPuestoUSD,

        MontoEstimadoInversionPuestoRD,
        OrigenFondosPuestoRD,
        OtroOrigenFondosPuestoRD,

        MontoEstimadoInversionSafiUSD,
        OrigenFondosSafiUSD,
        OtroOrigenFondosSafiUSD,

        MontoEstimadoInversionSafiRD,
        OrigenFondosSafiRD,
        OtroOrigenFondosSafiRD,

        NumeroClienteUCS,
        CuentaBancoMoneda,
        MontoPrestamo,
        MonedaCertificado,
        MontoCertificado,

        BeneficiariosTransaccion,
        IdentificacionBeneficiarioFinal,
        FormaTransacciones,
        TipoTransferencia,
        PersonasRelacionadas,
        CualesPersonasRelacionadas,
        SelectVinculadoJMMB,
        VinculadoJMMB
      )
      VALUES
      (
        @IdSolicitud,

        @MontoEstimadoInversionPuestoUSD,
        @OrigenFondosPuestoUSD,
        @OtroOrigenFondosPuestoUSD,

        @MontoEstimadoInversionPuestoRD,
        @OrigenFondosPuestoRD,
        @OtroOrigenFondosPuestoRD,

        @MontoEstimadoInversionSafiUSD,
        @OrigenFondosSafiUSD,
        @OtroOrigenFondosSafiUSD,

        @MontoEstimadoInversionSafiRD,
        @OrigenFondosSafiRD,
        @OtroOrigenFondosSafiRD,

        @NumeroClienteUCS,
        @CuentaBancoMoneda,
        @MontoPrestamo,
        @MonedaCertificado,
        @MontoCertificado,

        @BeneficiariosTransaccion,
        @IdentificacionBeneficiarioFinal,
        @FormaTransacciones,
        @TipoTransferencia,
        @PersonasRelacionadas,
        @CualesPersonasRelacionadas,
        @SelectVinculadoJMMB,
        @VinculadoJMMB
      )
    `);

  // ==========================================
  // PRODUCTOS SOLICITADOS
  // ==========================================

  if (
    Array.isArray(datosAdicionales.productosSolicitados) &&
    datosAdicionales.productosSolicitados.length > 0
  ) {
    for (const producto of datosAdicionales.productosSolicitados) {
      const productoRequest = new sql.Request(transaction);

      await productoRequest
        .input("IdSolicitud", sql.Int, idSolicitud)
        .input("Producto", sql.NVarChar(150), producto).query(`
          INSERT INTO ProductoSolicitado
          (
            IdSolicitud,
            Producto
          )
          VALUES
          (
            @IdSolicitud,
            @Producto
          )
        `);
    }
  }
}

module.exports = {
  guardarDatoAdicional,
};
