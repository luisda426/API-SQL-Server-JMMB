const {
  guardarVinculacionCliente,
} = require("../services/datosVinculacion");

const { limpiarDatos } = require("../utils/cleanData");

async function guardarVinculacionClienteController(req, res) {
  try {
    const idSolicitud = Number(req.params.id);

    if (!idSolicitud) {
      return res.status(400).json({
        error: "IdSolicitud inválido.",
      });
    }

    const datos = limpiarDatos(req.body);

    await guardarVinculacionCliente(idSolicitud, datos);

    res.status(201).json({
      mensaje: "Información de vinculación guardada correctamente.",

      idSolicitud,
    });
  } catch (error) {
    console.error("Error guardando vinculación:", error);

    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  guardarVinculacionClienteController,
};
