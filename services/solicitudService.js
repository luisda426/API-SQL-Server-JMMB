const { sql, config } = require("../config/database");

const { guardarDatoCliente } = require("./datoClienteService");
const { guardarDatoLaboral } = require("./datoLaboralService");
const { guardarFatca } = require("./datoFatcaService");
const { guardarDatoPep } = require("./datoPepService");
const { guardarDatoAdicional } = require("./datoAdicionalService");
const { guardarDatoCuestionario } = require("./datoCuestionarioService");
const { guardarDatoCuestionario2 } = require("./datoCuestionario2Service");
const { guardarDeclaracion } = require("./datoDeclaracionService");
const { guardarDatoDocumento } = require("./datoDocumentoService");
const { guardarDatoPreferencia } = require("./datoPreferenciaService");

const crearSolicitudCompleta = async (datos) => {
  const pool = await sql.connect(config);

  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const solicitud = await new sql.Request(transaction).query(`
                INSERT INTO Solicitud (Estado)
                OUTPUT INSERTED.IdSolicitud
                VALUES ('Pendiente')
            `);

    const idSolicitud = solicitud.recordset[0].IdSolicitud;

    await guardarDatoPreferencia(
      transaction,
      idSolicitud,
      datos.datosPreferencias,
    );

    await guardarDatoCliente(
      new sql.Request(transaction),
      idSolicitud,
      datos.datosCliente,
    );

    await guardarDatoLaboral(
      new sql.Request(transaction),
      idSolicitud,
      datos.datosLaborales,
    );

    await guardarFatca(
      new sql.Request(transaction),
      idSolicitud,
      datos.datosFatca,
    );

    await guardarDatoPep(
      new sql.Request(transaction),
      idSolicitud,
      datos.datosPep,
    );

    await guardarDatoAdicional(
      transaction,
      idSolicitud,
      datos.datosAdicionales,
    );

    await guardarDatoCuestionario(
      transaction,
      idSolicitud,
      datos.datosCuestionario,
    );

    await guardarDatoCuestionario2(
      transaction,
      idSolicitud,
      datos.datosCuestionario2,
    );

    await guardarDeclaracion(transaction, idSolicitud, datos.datosDeclaracion);

    await guardarDatoDocumento(transaction, idSolicitud, datos.datosDocumentos);

    await transaction.commit();

    return idSolicitud;
  } catch (error) {
    await transaction.rollback();

    throw error;
  }
};

const obtenerSolicitudes = async () => {
  const pool = await sql.connect(config);

  const resultado = await pool.request().query(`
    SELECT
      s.IdSolicitud,
      s.FechaCreacion,
      s.Estado,

      c.Nombres,
      c.Apellidos,
      c.Identificacion,
      c.Celular,
      c.TelefonoCasa

    FROM Solicitud s

    LEFT JOIN DatoCliente c
      ON c.IdSolicitud = s.IdSolicitud

    ORDER BY s.FechaCreacion DESC
  `);

  return resultado.recordset.map((fila) => ({
    idSolicitud: fila.IdSolicitud,

    solicitud: {
      fechaCreacion: fila.FechaCreacion,
      estadoSolicitud: fila.Estado,
    },

    datosCliente: {
      nombres: fila.Nombres,
      apellidos: fila.Apellidos,
      identificacion: fila.Identificacion,
      celular: fila.Celular,
      telefonoCasa: fila.TelefonoCasa,
    },
  }));
};

function convertirFilaACamelCase(fila) {
  if (!fila) return {};

  const resultado = {};

  for (const [clave, valor] of Object.entries(fila)) {
    const nuevaClave = clave.charAt(0).toLowerCase() + clave.slice(1);

    resultado[nuevaClave] = valor;
  }

  return resultado;
}

const obtenerSolicitudPorId = async (idSolicitud) => {
  const pool = await sql.connect(config);

  // ==========================================
  // SOLICITUD
  // ==========================================

  const resultadoSolicitud = await pool
    .request()
    .input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM Solicitud
        WHERE IdSolicitud = @IdSolicitud
      `);

  if (resultadoSolicitud.recordset.length === 0) {
    return null;
  }

  const solicitudSQL = resultadoSolicitud.recordset[0];

  // ==========================================
  // CONSULTAR TODAS LAS SECCIONES
  // ==========================================

  const [
    clienteResultado,
    laboralResultado,
    fatcaResultado,
    pepResultado,
    adicionalResultado,
    cuestionarioResultado,
    cuestionario2Resultado,
    declaracionResultado,
    preferenciaResultado,
    preferenciaEntidadResultado,
    documentosResultado,
    operacionesResultado,
    vinculacionResultado,
  ] = await Promise.all([
    // CLIENTE
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatoCliente
        WHERE IdSolicitud = @IdSolicitud
      `),

    // LABORAL
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatoLaboral
        WHERE IdSolicitud = @IdSolicitud
      `),

    // FATCA
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatoFatca
        WHERE IdSolicitud = @IdSolicitud
      `),

    // PEP
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatoPep
        WHERE IdSolicitud = @IdSolicitud
      `),

    // ADICIONAL
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatoAdicional
        WHERE IdSolicitud = @IdSolicitud
      `),

    // CUESTIONARIO
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatoCuestionario
        WHERE IdSolicitud = @IdSolicitud
      `),

    // CUESTIONARIO 2
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatoCuestionario2
        WHERE IdSolicitud = @IdSolicitud
      `),

    // DECLARACIÓN
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatoDeclaracion
        WHERE IdSolicitud = @IdSolicitud
      `),

    // PREFERENCIA PRINCIPAL
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatoPreferencia
        WHERE IdSolicitud = @IdSolicitud
      `),

    // ENTIDADES DE PREFERENCIA
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT Entidad, TipoRelacion
        FROM PreferenciaEntidad
        WHERE IdSolicitud = @IdSolicitud
      `),

    // DOCUMENTOS
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT
          NombreArchivo,
          Ruta,
          TipoArchivo,
          TamanoBytes,
          TipoDocumento
        FROM DatoDocumento
        WHERE IdSolicitud = @IdSolicitud
      `),

    // OPERACIONES FINANCIERAS
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT Operacion
        FROM OperacionFinanciera
        WHERE IdSolicitud = @IdSolicitud
      `),

    // VINCULACION
    pool.request().input("IdSolicitud", sql.Int, idSolicitud).query(`
        SELECT *
        FROM DatosVinculacion
        WHERE IdSolicitud = @IdSolicitud
      `),
  ]);

  // ==========================================
  // CONVERTIR FILAS
  // ==========================================

  const cliente = convertirFilaACamelCase(clienteResultado.recordset[0]);

  const laboral = convertirFilaACamelCase(laboralResultado.recordset[0]);

  const fatca = convertirFilaACamelCase(fatcaResultado.recordset[0]);

  const pep = convertirFilaACamelCase(pepResultado.recordset[0]);

  const adicionales = convertirFilaACamelCase(adicionalResultado.recordset[0]);

  const cuestionario = convertirFilaACamelCase(
    cuestionarioResultado.recordset[0],
  );

  const financiera = convertirFilaACamelCase(
    cuestionario2Resultado.recordset[0],
  );

  const declaracion = convertirFilaACamelCase(
    declaracionResultado.recordset[0],
  );

  const preferencias = convertirFilaACamelCase(
    preferenciaResultado.recordset[0],
  );

  const vinculacion =
    vinculacionResultado.recordset.length > 0
      ? convertirFilaACamelCase(vinculacionResultado.recordset[0])
      : null;

  // ==========================================
  // CORRECCIÓN ESTADO CIVIL
  // ==========================================

  if ("estadoCivil" in cliente) {
    cliente.civil = cliente.estadoCivil;

    delete cliente.estadoCivil;
  }

  // ==========================================
  // PREFERENCIAS ARRAYS
  // ==========================================

  preferencias.entidadesCliente = preferenciaEntidadResultado.recordset
    .filter((fila) => fila.TipoRelacion === "Cliente")
    .map((fila) => fila.Entidad);

  preferencias.institucionesVincular = preferenciaEntidadResultado.recordset
    .filter((fila) => fila.TipoRelacion === "Vincular")
    .map((fila) => fila.Entidad);

  // ==========================================
  // OPERACIONES FINANCIERAS
  // ==========================================

  cuestionario.operacionesFinancieras = operacionesResultado.recordset.map(
    (fila) => fila.Operacion,
  );

  // ==========================================
  // DOCUMENTOS
  // ==========================================

  const documentos = documentosResultado.recordset.map((fila) =>
    convertirFilaACamelCase(fila),
  );

  // ==========================================
  // PRODUCTOS SOLICITADOS
  // ==========================================

  const resultadoProductos = await pool
    .request()
    .input("IdSolicitud", sql.Int, idSolicitud).query(`
      SELECT Producto
      FROM ProductoSolicitado
      WHERE IdSolicitud = @IdSolicitud
    `);

  adicionales.productosSolicitados = resultadoProductos.recordset.map(
    (fila) => fila.Producto,
  );

  // ==========================================
  // OBJETO FINAL
  // ==========================================

  return {
    idSolicitud: solicitudSQL.IdSolicitud,

    solicitud: {
      fechaCreacion: solicitudSQL.FechaCreacion,
      estadoSolicitud: solicitudSQL.Estado,
      fechaActualizacion: solicitudSQL.FechaActualizacion,
    },

    datosPreferencias: preferencias,

    datosCliente: cliente,

    datosLaborales: laboral,

    datosFatca: fatca,

    datosPep: pep,

    datosAdicionales: adicionales,

    datosCuestionario: cuestionario,

    datosCuestionario2: financiera,

    datosDeclaracion: declaracion,

    datosDocumentos: documentos,

    datosVinculacion: vinculacion,
  };
};

module.exports = {
  crearSolicitudCompleta,
  obtenerSolicitudes,
  obtenerSolicitudPorId,
};
