const fs = require("fs");
const path = require("path");

async function guardarDocumentos(identificacion, archivos, tiposDocumento) {
  const documentos = [];

  const tipos = Array.isArray(tiposDocumento)
    ? tiposDocumento
    : [tiposDocumento];

  for (let i = 0; i < archivos.length; i++) {
    const archivo = archivos[i];

    const tipoDocumento = tipos[i];

    if (!tipoDocumento) {
      continue;
    }

    // Extensión original del archivo
    const extension = path.extname(archivo.originalname);

    // Fecha y hora
    const ahora = new Date();

    const fecha =
      ahora.getFullYear().toString() +
      String(ahora.getMonth() + 1).padStart(2, "0") +
      String(ahora.getDate()).padStart(2, "0");

    const hora =
      String(ahora.getHours()).padStart(2, "0") +
      String(ahora.getMinutes()).padStart(2, "0") +
      String(ahora.getSeconds()).padStart(2, "0");

    // Nombre definitivo
    const nombreFinal = `${identificacion}_${fecha}_${hora}_${tipoDocumento.toUpperCase()}${extension}`;

    // Ruta actual del archivo temporal
    const rutaActual = archivo.path;

    // Nueva ruta
    const rutaNueva = path.join(path.dirname(rutaActual), nombreFinal);

    // Renombrar archivo
    fs.renameSync(rutaActual, rutaNueva);

    // Ruta que guardaremos en la base de datos
    const rutaPublica = `/uploads/${nombreFinal}`;

    documentos.push({
      nombreArchivo: nombreFinal,

      nombreOriginal: archivo.originalname,

      ruta: rutaPublica,

      tipoArchivo: archivo.mimetype,

      tamanoBytes: archivo.size,

      tipoDocumento: tipoDocumento,
    });
  }

  return documentos;
}

module.exports = {
  guardarDocumentos,
};
