//middleware para validar el token jwt

//importar path para devolver vistas 
const path = require("path")

//importar el modulo jsonwebtoken
const jwt = require("jsonwebtoken")
//importar el modulo dotenv al proyecto 
const dotenv = require("dotenv")
dotenv.config()

//traemos el secret para JWT
const secret = process.env.SECRETJWT

//implementamos el middleware como funcion

function verficarToken(req,res,next){
    
    //capturar el token enviado desde el header
    // const portadora = req.headers["authorization"]
    const portadora = req.cookies.token
    //validar si la portadora con bearer y token fue recibida
    if (portadora) {
        //capturamos en tokenportadora el valor del token o la posicion 1 del array
        // const tokenportadora = portadora.split("")[1]

        req.token = portadora

        jwt.verify(req.token,secret,(error,datos)=>{
            if (error) {
                console.log("error en la verificacion del token")
                return res.status(401).json({redirection: "/noautorizado"})
                // return res.status(401).send("Error en el token")
                //res.status(401).sendFile(path.join(global._basedir,"public/views/noautorizado.html"))
            }
            next()
    })

    }else{
        res.status(401).send("token no generado")
    }
    
}

module.exports = verficarToken