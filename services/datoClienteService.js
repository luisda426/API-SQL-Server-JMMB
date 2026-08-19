const { sql } = require("../config/database");

async function guardarDatoCliente(request, idSolicitud, datosCliente) {
  await request
    .input("IdSolicitud", sql.Int, idSolicitud)

    // ==========================================
    // DATOS PERSONALES
    // ==========================================

    .input("Nombres", sql.NVarChar(150), datosCliente.nombres)
    .input("Apellidos", sql.NVarChar(150), datosCliente.apellidos)
    .input("TipoDocumento", sql.NVarChar(50), datosCliente.tipoDocumento)
    .input("Identificacion", sql.NVarChar(50), datosCliente.identificacion)
    .input("IdExtranjero", sql.NVarChar(50), datosCliente.idExtranjero)
    .input("FechaNacimiento", sql.Date, datosCliente.fechaNacimiento)

    .input("TelefonoCasa", sql.NVarChar(30), datosCliente.telefonoCasa)
    .input("Celular", sql.NVarChar(30), datosCliente.celular)
    .input("OtroTelefono", sql.NVarChar(30), datosCliente.otroTelefono)

    .input(
      "LugarNacimiento",
      sql.NVarChar(100),
      datosCliente.lugarNacimiento
    )
    .input("Nacionalidad", sql.NVarChar(100), datosCliente.nacionalidad)

    .input("Direccion", sql.NVarChar(300), datosCliente.direccion)
    .input("Ciudad", sql.NVarChar(100), datosCliente.ciudad)
    .input("Sector", sql.NVarChar(100), datosCliente.sector)
    .input("Pais", sql.NVarChar(100), datosCliente.pais)

    .input("Email", sql.NVarChar(150), datosCliente.email)

    .input("Ley155", sql.Bit, datosCliente.ley155)

    // En el objeto se llama "civil"
    // En SQL la columna se llama EstadoCivil
    .input("EstadoCivil", sql.NVarChar(50), datosCliente.civil)

    .input("Sexo", sql.NVarChar(20), datosCliente.sexo)

    // ==========================================
    // CAMPOS NUEVOS
    // ==========================================

    .input("ResidenteRD", sql.Bit, datosCliente.residenteRD)

    .input("Profesion", sql.NVarChar(150), datosCliente.profesion)

    .input(
      "OtraProfesion",
      sql.NVarChar(150),
      datosCliente.otraProfesion
    )

    .input("Ocupacion", sql.NVarChar(150), datosCliente.ocupacion)

    .input(
      "IngresosFormales",
      sql.Bit,
      datosCliente.ingresosFormales
    )

    .input(
      "OtrosIngresosFormales",
      sql.NVarChar(150),
      datosCliente.otrosIngresosFormales
    )

    .input(
      "ActLaboralFinanciera",
      sql.Bit,
      datosCliente.actLaboralFinanciera
    )

    .input(
      "ExplicacionActLaboralFinanciera",
      sql.NVarChar(300),
      datosCliente.explicacionActLaboralFinanciera
    )

    // ==========================================
    // DATOS DEL CÓNYUGE
    // ==========================================

    .input(
      "NombresConyuge",
      sql.NVarChar(150),
      datosCliente.nombresConyuge
    )

    .input(
      "ApellidosConyuge",
      sql.NVarChar(150),
      datosCliente.apellidosConyuge
    )

    .input(
      "EmailConyuge",
      sql.NVarChar(100),
      datosCliente.emailConyuge
    )

    .input(
      "EdadConyuge",
      sql.NVarChar(30),
      datosCliente.edadConyuge
    )

    .input(
      "TipoDocumentoConyuge",
      sql.NVarChar(50),
      datosCliente.tipoDocumentoConyuge
    )

    .input(
      "IdentificacionConyuge",
      sql.NVarChar(50),
      datosCliente.identificacionConyuge
    )

    .input(
      "LaboraConyuge",
      sql.NVarChar(50),
      datosCliente.laboraConyuge
    )

    .input(
      "CargoConyuge",
      sql.NVarChar(30),
      datosCliente.cargoConyuge
    )

    .input(
      "TelefonoCasaConyuge",
      sql.NVarChar(100),
      datosCliente.telefonoCasaConyuge
    )

    .input(
      "CelularConyuge",
      sql.NVarChar(30),
      datosCliente.celularConyuge
    )

    .input(
      "IngresosConyuge",
      sql.NVarChar(100),
      datosCliente.ingresosConyuge
    )

    .query(`
      INSERT INTO DatoCliente
      (
        IdSolicitud,
        Nombres,
        Apellidos,
        TipoDocumento,
        Identificacion,
        IdExtranjero,
        FechaNacimiento,
        TelefonoCasa,
        Celular,
        OtroTelefono,
        LugarNacimiento,
        Nacionalidad,
        Direccion,
        Ciudad,
        Sector,
        Pais,
        Email,
        Ley155,
        EstadoCivil,
        Sexo,
        ResidenteRD,
        Profesion,
        OtraProfesion,
        Ocupacion,
        IngresosFormales,
        OtrosIngresosFormales,
        ActLaboralFinanciera,
        ExplicacionActLaboralFinanciera,
        NombresConyuge,
        ApellidosConyuge,
        EmailConyuge,
        EdadConyuge,
        TipoDocumentoConyuge,
        IdentificacionConyuge,
        LaboraConyuge,
        CargoConyuge,
        TelefonoCasaConyuge,
        CelularConyuge,
        IngresosConyuge
      )
      VALUES
      (
        @IdSolicitud,
        @Nombres,
        @Apellidos,
        @TipoDocumento,
        @Identificacion,
        @IdExtranjero,
        @FechaNacimiento,
        @TelefonoCasa,
        @Celular,
        @OtroTelefono,
        @LugarNacimiento,
        @Nacionalidad,
        @Direccion,
        @Ciudad,
        @Sector,
        @Pais,
        @Email,
        @Ley155,
        @EstadoCivil,
        @Sexo,
        @ResidenteRD,
        @Profesion,
        @OtraProfesion,
        @Ocupacion,
        @IngresosFormales,
        @OtrosIngresosFormales,
        @ActLaboralFinanciera,
        @ExplicacionActLaboralFinanciera,
        @NombresConyuge,
        @ApellidosConyuge,
        @EmailConyuge,
        @EdadConyuge,
        @TipoDocumentoConyuge,
        @IdentificacionConyuge,
        @LaboraConyuge,
        @CargoConyuge,
        @TelefonoCasaConyuge,
        @CelularConyuge,
        @IngresosConyuge
      )
    `);
}

module.exports = {
  guardarDatoCliente,
};