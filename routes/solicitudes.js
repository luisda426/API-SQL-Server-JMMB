const express = require("express");
const router = express.Router();

const {
  crearSolicitudController,
  obtenerSolicitudesController,
  obtenerSolicitudPorIdController,
} = require("../controllers/solicitudController");

const {
  guardarVinculacionClienteController,
} = require("../controllers/vinculacionClienteController");

router.post("/", crearSolicitudController);

router.get("/", obtenerSolicitudesController);

router.get("/:id", obtenerSolicitudPorIdController);

router.post("/:id/vinculacion", guardarVinculacionClienteController);

module.exports = router;
