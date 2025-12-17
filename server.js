console.clear()

// importar el modulo dotenv al proyecto 
const dotenv = require("dotenv")

dotenv.config()

//importar modulos necesarios para implementación
const express = require("express")
const path = require("path")
const fs = require("fs")
const cors = require("cors")

//importar modulo de cookie-parser
const cookieParser = require("cookie-parser")

//importamos el middleware anticache
const anticache =  require ("./middlewares/anticache")

// variable global para ruta absoluta a la base de mi proyecto
global._basedir = __dirname

//puerto para la aplicacion, por medio de variable global desde el .env 
const puerto = process.env.PUERTO

//constante para nuestra aplicación 
const app = express()

//configurar como motor de plantillas a ejs
app.set("view engine","ejs")
//establecemos la ruta por defecto para las plantillas
app.set("views",__dirname + "/public/views")


//Middleware de aplicacion
app.use(express.static(path.join(__dirname,"public")))

app.use(express.json())
app.use(cors())
//app.use(express.text())

//implementamos el uso de anticache para evitar el cacheo de las vistas
app.use(anticache)

//asociar el modulo de cookie-parser a la aplicacion
app.use(cookieParser())

//importar el modulo exportado desde adminrouters (rutas)
const rutasApp = require("./routes/adminrouters")

app.use(rutasApp)

//implementacion del servidor express
app.listen(puerto,()=>{
    console.log(`listo por el puerto: http://localhost:${puerto}`)
} )