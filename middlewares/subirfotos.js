//multer para multiples imagenes 

//importamos multer
const multer = require("multer")
//importamos fs y path 
const fs = require("fs")
const path = require("path")


//middleware para almacenamiento
const almacenamiento = multer.diskStorage({
    destination:(req, file, destino) =>{

        //capturar el nombre del producto 
        let nombreProducto = req.body.nombre
        //definir la ruta con el nombre del directorio que se va a crear 
        const directorio = path.join(global._basedir, 'public/assets/fotosproducto', nombreProducto)

        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, {recursive: true})
        }

        destino(null, directorio)
    },
    filename:(req, file, nombre) =>{
        //capturamos la extension 
        let extension = file.mimetype.split('/')[1]
        //capturamos el nombre del producto
        let nombreProducto = req.body.nombre

        //generar el nuevo nombre con date.now() para consecutivo 
        let nuevoNombre = nombreProducto + Date.now()

        nombre(null, `${nuevoNombre.split('.')[0]}.${extension}`)
    }
})

const subirArchivos = multer({storage: almacenamiento})

module.exports = subirArchivos