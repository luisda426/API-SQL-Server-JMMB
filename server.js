const express = require("express");

const cors = require("cors");
require("dotenv").config();

const { sql, config } = require("./config/database");
const solicitudesRoutes = require("./routes/solicitudes");
const documentosRoutes = require("./routes/documentos");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/documentos", documentosRoutes);

// Archivos subidos
app.use("/uploads", express.static("uploads"));

// Probar conexión
app.get("/clientes", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const resultado = await pool.request().query("SELECT * FROM Clientes");

    res.json(resultado.recordset);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// Insertar cliente de prueba
app.post("/clientes", async (req, res) => {
  try {
    const { nombre, correo } = req.body;

    const pool = await sql.connect(config);

    await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("correo", sql.NVarChar, correo).query(`
                INSERT INTO Clientes (Nombre, Correo)
                VALUES (@nombre, @correo)
            `);

    res.json({
      mensaje: "Cliente guardado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
