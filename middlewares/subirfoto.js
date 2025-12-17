//para crear directorios o carpetas se requiere el modulo fs
const fs = require("fs")

//importamos el modulo de path para archivos estaticos 
const path = require("path")
//midleware de terceros (multer)

const multer = require("multer")

const almacenar = multer.diskStorage({
    destination:(req, file, destino) =>{
        //capturar el nombre de usuario de la peticion 
        let nombreuser = req.body.nombreusuario
        //ruta relativa asociada al nombre del usuario que se capturo en nombreuser
        let directorio = path.join(global._basedir, "public/assets/fotoperfil",nombreuser)

        //creamos el directorio o la carpeta 
        if(!fs.existsSync(directorio)){
        fs.mkdirSync(directorio, {recursive: true})
        }
        destino(null, directorio)
    },
    filename:(req, file, nombre) =>{
        let nombreuser = req.body.nombreusuario

        let nuevonombre = nombreuser + (Date.now() + 2)
        
        let extension = file.mimetype.split('/')[1]

        nombre(null, `${nuevonombre.split(".")[0]}.${extension}`)
    }
})

const subirArchivo = multer({storage:almacenar})

module.exports = subirArchivo