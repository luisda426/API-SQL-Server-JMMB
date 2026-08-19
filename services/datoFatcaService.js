const { sql } = require("../config/database");


const guardarFatca = async (request, idSolicitud, datosFatca) => {


    console.log("Entrando a guardarFatca");
    console.log("IdSolicitud:", idSolicitud);
    console.log(datosFatca);



    await request

        .input("IdSolicitud", sql.Int, idSolicitud)

        .input("OtrasCiudadanias", sql.Bit, datosFatca.otrasCiudadanias)
        .input("Ciudadania1", sql.NVarChar, datosFatca.ciudadania1)
        .input("Ciudadania2", sql.NVarChar, datosFatca.ciudadania2)

        .input("ResidenciaFisicaUSA", sql.Bit, datosFatca.residenciaFisicaUSA)

        .input("TIN", sql.NVarChar, datosFatca.tin)

        .input("MasResidenciaFiscal", sql.Bit, datosFatca.masResidenciaFiscal)
        .input("PaisesResidenciaFiscal", sql.NVarChar, datosFatca.paisesResidenciaFiscal)

        .input("Comentarios", sql.NVarChar, datosFatca.comentarios)

        .input("CondicionUSA", sql.NVarChar, datosFatca.condicionUSA)
        .input("DetalleResidenciaUSA", sql.NVarChar, datosFatca.detalleResidenciaUSA)

        .input("GreenCard", sql.Bit, datosFatca.greenCard)

        .input("DireccionEnvioUSA", sql.Bit, datosFatca.direccionEnvioUSA)
        .input("DireccionEnvio", sql.NVarChar, datosFatca.direccionEnvio)

        .input("DireccionResidenciaUSA", sql.Bit, datosFatca.direccionResidenciaUSA)
        .input("DireccionResidencia", sql.NVarChar, datosFatca.direccionResidencia)

        .input("TelefonoExtranjero", sql.Bit, datosFatca.telefonoExtranjero)
        .input("TelefonoExtranjeroNumero", sql.NVarChar, datosFatca.telefonoExtranjeroNumero)



        .query(`

            INSERT INTO DatoFatca
            (
                IdSolicitud,
                OtrasCiudadanias,
                Ciudadania1,
                Ciudadania2,
                ResidenciaFisicaUSA,
                TIN,
                MasResidenciaFiscal,
                PaisesResidenciaFiscal,
                Comentarios,
                CondicionUSA,
                DetalleResidenciaUSA,
                GreenCard,
                DireccionEnvioUSA,
                DireccionEnvio,
                DireccionResidenciaUSA,
                DireccionResidencia,
                TelefonoExtranjero,
                TelefonoExtranjeroNumero
            )

            VALUES
            (
                @IdSolicitud,
                @OtrasCiudadanias,
                @Ciudadania1,
                @Ciudadania2,
                @ResidenciaFisicaUSA,
                @TIN,
                @MasResidenciaFiscal,
                @PaisesResidenciaFiscal,
                @Comentarios,
                @CondicionUSA,
                @DetalleResidenciaUSA,
                @GreenCard,
                @DireccionEnvioUSA,
                @DireccionEnvio,
                @DireccionResidenciaUSA,
                @DireccionResidencia,
                @TelefonoExtranjero,
                @TelefonoExtranjeroNumero
            )

        `);

};


module.exports = {
    guardarFatca
};