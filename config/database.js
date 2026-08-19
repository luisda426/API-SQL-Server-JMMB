//Aquí solamente vivirá la conexión con SQL Server.

const sql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),

    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = {
    sql,
    config
};