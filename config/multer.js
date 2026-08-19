const multer = require("multer");
const path = require("path");
const fs = require("fs");

const carpetaUploads = path.join(__dirname, "..", "uploads");

// Crear carpeta uploads si no existe
if (!fs.existsSync(carpetaUploads)) {
  fs.mkdirSync(carpetaUploads, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpetaUploads);
  },

  filename: (req, file, cb) => {
    // Por ahora utilizamos un nombre temporal
    const nombreTemporal = `${Date.now()}_${file.originalname}`;

    cb(null, nombreTemporal);
  },
});

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = upload;
