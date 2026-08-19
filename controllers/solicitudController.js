const {
  crearSolicitudCompleta,
  obtenerSolicitudes,
  obtenerSolicitudPorId,
} = require("../services/solicitudService");

const { limpiarDatos } = require("../utils/cleanData");

const crearSolicitudController = async (req, res) => {
  try {
    const datosLimpios = limpiarDatos(req.body);

    const idSolicitud = await crearSolicitudCompleta(datosLimpios);

    res.json({
      mensaje: "Solicitud guardada correctamente",
      idSolicitud,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

const obtenerSolicitudesController = async (req, res) => {
  try {
    const solicitudes = await obtenerSolicitudes();

    res.json(solicitudes);
  } catch (error) {
    console.error("Error obteniendo solicitudes:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

const obtenerSolicitudPorIdController = async (req, res) => {
  try {
    const idSolicitud = Number(req.params.id);

    if (!idSolicitud) {
      return res.status(400).json({
        error: "IdSolicitud inválido",
      });
    }

    const solicitud =
      await obtenerSolicitudPorId(idSolicitud);

    if (!solicitud) {
      return res.status(404).json({
        error: "Solicitud no encontrada",
      });
    }

    res.json(solicitud);

  } catch (error) {
    console.error(
      "Error obteniendo solicitud:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  crearSolicitudController,
  obtenerSolicitudesController,
  obtenerSolicitudPorIdController,
};
