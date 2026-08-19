const { sql } = require("../config/database");

async function guardarDatoDocumento(transaction, idSolicitud, documentos) {
  if (!documentos || documentos.length === 0) {
    return;
  }

  for (const documento of documentos) {
    await new sql.Request(transaction)
      .input("IdSolicitud", sql.Int, idSolicitud)
      .input("NombreArchivo", sql.NVarChar(255), documento.nombreArchivo)
      .input("Ruta", sql.NVarChar(500), documento.ruta)
      .input("TipoArchivo", sql.NVarChar(100), documento.tipoArchivo)
      .input("TamanoBytes", sql.BigInt, documento.tamanoBytes)
      .input("TipoDocumento", sql.NVarChar(100), documento.tipoDocumento)
      .query(`
                INSERT INTO DatoDocumento
                (
                    IdSolicitud,
                    NombreArchivo,
                    Ruta,
                    TipoArchivo,
                    TamanoBytes,
                    TipoDocumento
                )
                VALUES
                (
                    @IdSolicitud,
                    @NombreArchivo,
                    @Ruta,
                    @TipoArchivo,
                    @TamanoBytes,
                    @TipoDocumento
                )
            `);
  }
}

module.exports = {
  guardarDatoDocumento,
};
