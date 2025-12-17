
//validar el ingreso de la consulta por parte del usuario 

//defnir nuestro middleware de ruta 
const capital = (req, resp, next) => {
    //capturamos el parametro de la peticion que viene por la url 
    let texto = req.params.nombre

    //convertir lo recibido en minuscula 
    texto = texto.toLowerCase()

    //tomar la primera letra para ponerla en mayuscula y concatenarle lo demás 
    texto = texto.charAt(0).toUpperCase() + texto.slice(1)
    //variables que se pasan entre middlewares y rutas 
    resp.locals.textoValido = texto

    //parametro para continuar con el siguiente procedimiento 
    next()
}

module.exports = capital