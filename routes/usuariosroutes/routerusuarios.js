//importamos los modulos de express
const express = require("express")
const fs = require("fs")
const path = require("path")

//importamos el modulo de jsonwebtoken
const jwt = require("jsonwebtoken")
// importamos el secret para el jwt
const secret = process.env.SECRETJWT

//importamos el modulo para cifrado
const bcryptjs = require("bcryptjs")

// importamos el json de usuarios / ruta relativa
const mibdu = require("../../public/data/usuarios.json")

//importar dotenv
const dotenv = require("dotenv")
dotenv.config()

//importar la variable de entorno para el secretHash
const secretHash = process.env.SALTAPP_SECRET

//lectura de los usuarios (actualizada)
function traerusuarios() {
    const data = fs.readFileSync(path.join(global._basedir, 'public/data/usuarios.json'), 'utf8')
    //return data 
    return JSON.parse(data)
}

const usuariosRouter = express.Router()

//importamos el midlleware para verificar user
const verificarUser = require("../../middlewares/verificaruser")

//importamos el midlleware para subir la imagen
const subirArchivo = require("../../middlewares/subirfoto") 

//endpoint login
usuariosRouter.post("/usuarios/login", verificarUser, (req,resp)=>{
    const credenciales = {
        nombreuser : req.body.nombreus, 
        password : req.body.password
    }

    const nombreus = credenciales.nombreuser
    const passwordus = credenciales.password
    // const rol = req.body.rol
    // const rutahtml = "/views/indice.html"
    //por medio del metodo find() realizo la verificacion por usuario de las credenciales 

    const usuarios = traerusuarios()

    // const usuario = usuarios.find(user =>
    //     user.nombreusuario === nombreus && user.password === passwordus
    // )

    //generar el token con el moudulo sing()
    jwt.sign({usuario: credenciales}, secret, {expiresIn: '10m'}, (error, token)=>{
        console.log(token)
        resp.json({nombreus: credenciales.nombreuser ,token})
    })
    
    // if (usuarios) {
    //     resp.json({nombreus})
    // }else{
    //     resp.status(401).json({error:"credenciales incorrectas"})
    // }

})

//endponit para registro de usuarios
usuariosRouter.post("/usuarios/registraru", subirArchivo.single("imagenu"), async (req,resp) =>{
    let id = parseInt(req.body.id),
        nombres = req.body.nombres,
        nombreusuario = req.body.nombreusuario,
        password = req.body.password,
        correo = req.body.correo,
        telefono = parseInt(req.body.telefono),
        rol = req.body.rol,
        fotou = req.file

        // //implementar el cifrado hacia el json de usuarios
        // let passwordHashed = await bcryptjs.hash(password, 10)

        let passwordHasheada = await ( async(password)=>{
            const hashmejorado = password + secretHash
            return await bcryptjs.hash(hashmejorado, 10)
        })(password) //ejecutando la funcion anonima

        //realizamos el ajuste de la ruta 
        let rutaRelativa = `public\\assets\\fotoperfil\\${nombreusuario}\\${fotou.filename}`

        //objeto javaScript que preparamos para escribir mi archivo
        let infou = {
            id : id,
            nombres : nombres,
            nombreusuario : nombreusuario,
            password : passwordHasheada,
            correo : correo,
            telefono : telefono,
            rol : rol,
            foto : rutaRelativa
        }

        let mibdu = traerusuarios()

        mibdu.push(infou)

        let datos = JSON.stringify(mibdu)

        fs.writeFileSync("./public/data/usuarios.json", datos)

        resp.send(mibdu)
})

//endponit para consultar todos los usuarios
usuariosRouter.get("/usuarios/consultaru",(req,resp) =>{
    resp.json(mibdu)
})

usuariosRouter.get("/usuarios/consultaru/:nombre",(req,resp)=>{
    //capturar el valor que trae la peticion
    let nombrepeticion = req.params.nombre

    let consulta = mibdu.find(usuarios => usuarios.nombres === nombrepeticion)

    if (consulta) {
        resp.json(consulta)
    }else{
        resp.status(404).json({error:"usuario no encontrado"})
    }
})

usuariosRouter.patch('/usuarios/actualizaru/:id',(req,resp)=>{
    //capturamos el parametro del id que viene en la peticion lo interpretamos como entero
    let id = parseInt(req.params.id)

    //capturamos el password que viene en el cuerpo de la peticion 
    let password = parseFloat(req.body.password)

    //buscamos el usuario por medio del id 
    const usuario = mibdu.find(usuario=> usuario.id === id)

    //si existe el usuario, modificamos el password y le asignamos el valor capturado del cuerpo de la peticion
    usuario.password = password 

    //convertimos a formato JSON los datos actualizados 
    let datos = path.join(global._basedir, "public/data/usuarios.json")
    //reescribimos el archivo usuarios.json con los datos actualizados 
    fs.writeFileSync(datos, JSON.stringify(mibdu, null, 2));

    //devolvemos la respuesta con los usuarios actualizados esta respuesta va al frontend
    return resp.json({ success: true, usuario })
})

usuariosRouter.delete("/usuarios/eliminaru/:id",(req,resp)=>{
    //capturamos el parametro del id que viene de la peticion
    let id = parseInt(req.params.id)

    const indiceProducto = mibdu.findIndex(usuario=> usuario.id === id)

    if (indiceProducto === -1) {
        return resp.status(404).json({error: "producto no encontrado"})
    }else{
        mibdu.splice(indiceProducto, 1)
    }

    let datos = path.join(global._basedir, "public/data/usuarios.json")
    fs.writeFileSync(datos, JSON.stringify(mibdu));
    

    return resp.json({ success: true, usuario: mibdu });
})

module.exports = usuariosRouter