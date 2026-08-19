const limpiarDatos = (objeto) => {

    if (!objeto || typeof objeto !== "object") {
        return objeto;
    }


    const nuevoObjeto = {};


    Object.keys(objeto).forEach((key) => {

        const valor = objeto[key];


        // Si es un string vacío, convertirlo a null
        if (typeof valor === "string" && valor.trim() === "") {

            nuevoObjeto[key] = null;

        } 
        
        // Si es un array, lo dejamos igual por ahora
        else if (Array.isArray(valor)) {

            nuevoObjeto[key] = valor;

        }

        // Si es un objeto interno, limpiar también
        else if (typeof valor === "object" && valor !== null) {

            nuevoObjeto[key] = limpiarDatos(valor);

        }

        else {

            nuevoObjeto[key] = valor;

        }

    });


    return nuevoObjeto;

};


module.exports = {
    limpiarDatos
};