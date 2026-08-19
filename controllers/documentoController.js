const { guardarDocumentos } = require("../services/documentoService");

async function subirDocumentosController(req, res) {
  try {
    const identificacion = req.body.identificacion;

    const tiposDocumento = req.body.tiposDocumento;

    const archivos = req.files;

    if (!identificacion) {
      return res.status(400).json({
        error: "La identificación es obligatoria.",
      });
    }

    if (!archivos || archivos.length === 0) {
      return res.status(400).json({
        error: "No se recibió ningún documento.",
      });
    }

    const documentos = await guardarDocumentos(
      identificacion,
      archivos,
      tiposDocumento,
    );

    res.status(200).json({
      mensaje: "Documentos guardados correctamente.",

      documentos,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  subirDocumentosController,
};
