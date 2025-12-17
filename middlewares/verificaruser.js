//validar que tanto el usuario exista en el json y el password sea correcto 

const fs = require("fs")
const path = require("path")
const bcryptjs = require("bcryptjs")
//importar dotenv
const dotenv = require("dotenv")
dotenv.config()

//importar la variable de entorno para el secretHash
const secretHash = process.env.SALTAPP_SECRET

//importamos el json de usuarios para realizar validaciones 
// const mibdu = require("../public/data/usuarios.json")

//lectura de los usuarios (actualizada)
function traerusuarios() {
    const data = fs.readFileSync(path.join(global._basedir, 'public/data/usuarios.json'), 'utf8')
    //return data 
    return JSON.parse(data)
}

const verificaruser = async (req, resp, next) =>{

    const credenciales ={
        nombreus : req.body.nombreus,
        password : req.body.password
    }

    //implementar la lectura de los usuarios 
    let usuarios = traerusuarios()
    
    //si los valores de los campos no existen devuelve un estado 400 bad request
    if (!credenciales.nombreus || !credenciales.password) return resp.sendStatus(400) 
    let user = usuarios.find(user => user.nombreusuario === credenciales.nombreus)
    if(!user) return resp.status(401).json("Nombre de usuario no valido")

    // //comprobacion para password como texto plano sin cifrar 
    // if(user.password != credenciales.password) return resp.status(403).json("Password incorrecto")

    //comprobar cadenas cifradas
    
    const hashmejorado = credenciales.password + secretHash
    
    const comprobarpassword = await bcryptjs.compare(hashmejorado, user.password)

    if (!comprobarpassword){
        return resp.status(401).json({error: "Contraseña incorrecta"})
    }

    next()
}

module.exports = verificaruser