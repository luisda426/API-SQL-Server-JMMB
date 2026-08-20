CREATE TABLE Solicitud (
    IdSolicitud INT IDENTITY(1,1) PRIMARY KEY,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    Estado NVARCHAR(50) NOT NULL DEFAULT 'Pendiente',
    FechaActualizacion DATETIME2 NULL
);
GO

CREATE TABLE DatoPreferencia
(
    IdDatoPreferencia INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    BuroCredito BIT NOT NULL,
    OficinaPreferencia NVARCHAR(100) NOT NULL,
    PrimeraVez BIT NOT NULL,

    CONSTRAINT FK_DatoPreferencia_Solicitud
    FOREIGN KEY (IdSolicitud)
    REFERENCES Solicitud(IdSolicitud)
);

CREATE TABLE PreferenciaEntidad
(
    IdPreferenciaEntidad INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    Entidad NVARCHAR(50) NOT NULL,
    TipoRelacion NVARCHAR(30) NOT NULL,

    CONSTRAINT FK_PreferenciaEntidad_Solicitud
    FOREIGN KEY (IdSolicitud)
    REFERENCES Solicitud(IdSolicitud),

    CONSTRAINT UQ_PreferenciaEntidad
    UNIQUE (IdSolicitud, Entidad)
);

CREATE TABLE DatoCliente (
 
    IdDatoCliente INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    Nombres NVARCHAR(150) NOT NULL,
    Apellidos NVARCHAR(150) NOT NULL,
    TipoDocumento NVARCHAR(50) NOT NULL,
    Identificacion NVARCHAR(50) NOT NULL,
    IdExtranjero NVARCHAR(50) NULL,
    FechaNacimiento DATE NOT NULL,
    TelefonoCasa NVARCHAR(30) NULL,
    Celular NVARCHAR(30) NOT NULL,
    OtroTelefono NVARCHAR(30) NULL,
    LugarNacimiento NVARCHAR(100) NOT NULL,
    Nacionalidad NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(300) NOT NULL,
    Ciudad NVARCHAR(100) NOT NULL,
    Sector NVARCHAR(100) NOT NULL,
    Pais NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    Ley155 BIT NOT NULL,
    EstadoCivil NVARCHAR(50) NOT NULL,
    Sexo NVARCHAR(20) NOT NULL,
    ResidenteRD BIT NULL,
    Profesion NVARCHAR(150) NOT NULL,
    OtraProfesion NVARCHAR(150) NULL,
    Ocupacion NVARCHAR(150) NOT NULL,
    IngresosFormales BIT NOT NULL,
    OtrosIngresosFormales NVARCHAR(150) NULL,39
    ActLaboralFinanciera BIT NOT NULL,
    ExplicacionActLaboralFinanciera NVARCHAR(300) NULL,

    NombresConyuge NVARCHAR(150) NULL,
    ApellidosConyuge NVARCHAR(150) NULL,
    EmailConyuge NVARCHAR(100) NULL,
    EdadConyuge NVARCHAR(30) NULL,
    TipoDocumentoConyuge NVARCHAR(50) NULL,
    IdentificacionConyuge NVARCHAR(50) NULL,
    LaboraConyuge NVARCHAR(50) NULL,
    CargoConyuge NVARCHAR(30) NULL,
    TelefonoCasaConyuge NVARCHAR(100) NULL,
    CelularConyuge NVARCHAR(30) NULL,
    IngresosConyuge NVARCHAR(100) NULL,

    CONSTRAINT FK_DatoCliente_Solicitud
        FOREIGN KEY (IdSolicitud)
        REFERENCES Solicitud(IdSolicitud)
);
GO

CREATE TABLE DatoLaboral (
    IdDatoLaboral INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    Empresa NVARCHAR(200) NOT NULL,
    DireccionEmpresa NVARCHAR(300) NOT NULL,
    Ciudad NVARCHAR(100) NOT NULL,
    Sector NVARCHAR(100) NOT NULL,
    Pais NVARCHAR(100) NOT NULL,
    Cargo NVARCHAR(150) NOT NULL,
    FechaIngreso DATE NOT NULL,
    Telefono NVARCHAR(30) NULL,
    Email NVARCHAR(150) NULL,
    Comentarios NVARCHAR(MAX) NULL,

    CONSTRAINT FK_DatoLaboral_Solicitud
        FOREIGN KEY (IdSolicitud)
        REFERENCES Solicitud(IdSolicitud)

);
GO

CREATE TABLE DatoFatca (

    IdDatoFatca INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    OtrasCiudadanias BIT NOT NULL,
    Ciudadania1 NVARCHAR(100) NULL,
    Ciudadania2 NVARCHAR(100) NULL,
    ResidenciaFisicaUSA BIT NOT NULL,
    Tin NVARCHAR(100) NULL,
    MasResidenciaFiscal BIT NOT NULL,
    PaisesResidenciaFiscal NVARCHAR(300) NULL,
    Comentarios NVARCHAR(MAX) NULL,
    CondicionUSA NVARCHAR(150) NULL,
    DetalleResidenciaUSA NVARCHAR(MAX) NULL,
    GreenCard BIT NOT NULL,
    DireccionEnvioUSA BIT NOT NULL,
    DireccionEnvio NVARCHAR(300) NULL,
    DireccionResidenciaUSA BIT NOT NULL,
    DireccionResidencia NVARCHAR(300) NULL,
    TelefonoExtranjero BIT NOT NULL,
    TelefonoExtranjeroNumero NVARCHAR(50) NULL,

    CONSTRAINT FK_Fatca_Solicitud
        FOREIGN KEY (IdSolicitud)
        REFERENCES Solicitud(IdSolicitud)

);
GO

CREATE TABLE DatoPep
(
    IdDatoPep INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    EsPEP BIT NOT NULL,
    CargoPEP NVARCHAR(200) NULL,
    PaisPEP NVARCHAR(100) NULL,
    FechaDesignacionPEP DATE NULL,
    FechaRemocionPEP DATE NULL,
    RelacionPEP BIT NOT NULL,
    NombrePEP NVARCHAR(200) NULL,
    PaisPEPRelacionado NVARCHAR(100) NULL,
    ParentescoPEP NVARCHAR(100) NULL,
    CargoPEPRelacionado NVARCHAR(200) NULL,
    FechaDesignacionPEPRelacionado DATE NULL,
    FechaRemocionPEPRelacionado DATE NULL

      CONSTRAINT FK_DatoPep_Solicitud
            FOREIGN KEY (IdSolicitud)
            REFERENCES Solicitud(IdSolicitud)
);

CREATE TABLE DatoAdicional
(
    IdDatoAdicional INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,

    MontoEstimadoInversionPuestoUSD NVARCHAR(100) NULL,
    OrigenFondosPuestoUSD NVARCHAR(100) NULL,
    OtroOrigenFondosPuestoUSD NVARCHAR(100) NULL,
    MontoEstimadoInversionPuestoRD NVARCHAR(100) NULL,
    OrigenFondosPuestoRD NVARCHAR(100) NULL,
    OtroOrigenFondosPuestoRD NVARCHAR(100) NULL,
    MontoEstimadoInversionSafiUSD NVARCHAR(100) NULL,
    OrigenFondosSafiUSD NVARCHAR(100) NULL,
    OtroOrigenFondosSafiUSD NVARCHAR(100) NULL,
    MontoEstimadoInversionSafiRD NVARCHAR(100) NULL,
    OrigenFondosSafiRD NVARCHAR(100) NULL,
    OtroOrigenFondosSafiRD NVARCHAR(100) NULL,
    NumeroClienteUCS NVARCHAR(100) NULL,
    CuentaBancoMoneda NVARCHAR(100) NULL,
    MontoPrestamo NVARCHAR(100) NULL,
    MonedaCertificado NVARCHAR(10) NULL,
    MontoCertificado NVARCHAR(100) NULL,


    BeneficiariosTransaccion BIT NOT NULL,
    IdentificacionBeneficiarioFinal NVARCHAR(100) NULL,
    FormaTransacciones NVARCHAR(200) NOT NULL,
    TipoTransferencia NVARCHAR(100) NULL,
    PersonasRelacionadas BIT NOT NULL,
    CualesPersonasRelacionadas NVARCHAR(100) NULL,
    VinculadoJMMB NVARCHAR(100) NOT NULL,
    SelectVinculadoJMMB BIT NULL,


    CONSTRAINT FK_DatoAdicional_Solicitud
        FOREIGN KEY (IdSolicitud)
        REFERENCES Solicitud(IdSolicitud)
);

CREATE TABLE ProductoSolicitado
(
    IdProductoSolicitado INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    Producto NVARCHAR(300) NOT NULL

    CONSTRAINT FK_ProductoSolicitado_Solicitud
    FOREIGN KEY (IdSolicitud)
    REFERENCES Solicitud(IdSolicitud)
);

CREATE TABLE DatoCuestionario
(
    IdDatoCuestionario INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    EdadInversionista NVARCHAR(100) NOT NULL,
    ObjetivoCapital NVARCHAR(200) NOT NULL,
    CriterioRiesgo NVARCHAR(100) NOT NULL,
    NivelAcademico NVARCHAR(100) NOT NULL,
    OtrosDerivados NVARCHAR(MAX) NULL,
    PlazoObjetivos NVARCHAR(100) NOT NULL,
    PlazoNecesidadInversion NVARCHAR(100) NOT NULL,
    CapacidadPerdidas NVARCHAR(100) NOT NULL,

    CONSTRAINT FK_DatoCuestionario_Solicitud
    FOREIGN KEY (IdSolicitud)
    REFERENCES Solicitud(IdSolicitud)
);

CREATE TABLE OperacionFinanciera
(
    IdOperacionFinanciera INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    Operacion NVARCHAR(300) NOT NULL,

    CONSTRAINT FK_OperacionFinanciera_Solicitud
    FOREIGN KEY (IdSolicitud)
    REFERENCES Solicitud(IdSolicitud)
);

CREATE TABLE DatoCuestionario2
(
    IdDatoCuestionario2 INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    IngresosAnuales NVARCHAR(100) NULL,
    CapacidadAhorro NVARCHAR(100) NULL,
    TotalActivosLiquidos NVARCHAR(100) NULL,
    CuentaAhorroCorriente NVARCHAR(100) NULL,
    PatrimonioTotal NVARCHAR(100) NULL,
    ObligacionesDeudas NVARCHAR(100) NULL,
    Banco1 NVARCHAR(200) NULL,
    TipoCuenta1 NVARCHAR(100) NULL,
    TelefonoBanco1 NVARCHAR(50) NULL,
    OficialBanco1 NVARCHAR(200) NULL,
    Banco2 NVARCHAR(200) NULL,
    TipoCuenta2 NVARCHAR(100) NULL,
    TelefonoBanco2 NVARCHAR(50) NULL,
    OficialBanco2 NVARCHAR(200) NULL,
    PatrimonioPeriodo1 NVARCHAR(100) NULL,
    PatrimonioPeriodo2 NVARCHAR(100) NULL,
    PasivosPeriodo1 NVARCHAR(100) NULL,
    PasivosPeriodo2 NVARCHAR(100) NULL,

    CONSTRAINT FK_DatoCuestionario2_Solicitud
    FOREIGN KEY (IdSolicitud)
    REFERENCES Solicitud(IdSolicitud)
);

CREATE TABLE DatoDeclaracion
(
    IdDeclaracion INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    DeclaracionJurada BIT NULL,

    CONSTRAINT FK_DatoDeclaracion_Solicitud
    FOREIGN KEY (IdSolicitud)
    REFERENCES Solicitud(IdSolicitud)
);

CREATE TABLE DatoDocumento
(
    IdDocumento INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    NombreArchivo NVARCHAR(255) NOT NULL,
    Ruta NVARCHAR(500) NOT NULL,
    TipoArchivo NVARCHAR(100) NULL,
    TamanoBytes BIGINT NULL,
    TipoDocumento NVARCHAR(100) NOT NULL,

    CONSTRAINT FK_Documento_Solicitud
    FOREIGN KEY (IdSolicitud)
    REFERENCES Solicitud(IdSolicitud)
);

CREATE TABLE DatosVinculacion
(
    IdDatosVinculacion INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitud INT NOT NULL,
    TipoCliente NVARCHAR(100) NULL,
    VinculacionMancomunada BIT NULL,
    DuracionRelacion NVARCHAR(150) NULL,
    RelacionCaraCara BIT NULL,
    ResumenCliente NVARCHAR(500) NULL,
    ProductoAjustado BIT NULL,
    ActivosLiquidos25M BIT NULL,
    TipoClienteProspecto NVARCHAR(100) NULL,
    Tolerancia NVARCHAR(100) NULL,
    Bancarizacion NVARCHAR(100) NULL,

    CONSTRAINT FK_DatosVinculacion_Solicitud
        FOREIGN KEY (IdSolicitud)
        REFERENCES Solicitud(IdSolicitud)
);