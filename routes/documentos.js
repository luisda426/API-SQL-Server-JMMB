const express = require("express");

const router = express.Router();

const {
  subirDocumentosController,
} = require("../controllers/documentoController");

const upload = require("../config/multer");

router.post("/", upload.array("documentos"), subirDocumentosController);

module.exports = router;
