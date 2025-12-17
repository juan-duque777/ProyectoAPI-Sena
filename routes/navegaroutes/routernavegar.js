//importar express 
const express = require("express")
const path = require("path")
const cors = require("cors")

//importar jwt y el secret desde el .env, para comprobacion de token en la cookie
// const jwt = require("jsonwebtoken")
// const secret = process.env.SECRETJWT

//creamos el rouer para la navegacion por url 
const navegarRouter = express.Router()

//importar el middleware para validar token
const verficarToken = require("../../middlewares/validartoken")

//importar los controladores de navegacion
const { 
    navegarConsultar,
    navegarRegistrar,
    navegarActualizar,
    navegarEliminar,
    navegarLogin,
    navegarOpciones,
    navegarProductos,
    navegarUsuarios,
    navegarNoAutorizado,
    navegarConsultarUsuarios,
    navegarRegistrarUsuarios,
    navegarActualizarUsuarios,
    navegarEliminarUsuarios,
    navegarAlistar,
    navegarAindex
} = require("../../controllers/navegarController") 


//rutas de navegacion 

// //endpoint para capturar y procesar los valores para las rutas desde el frontend
// navegarRouter.post("/rutas", navegarVista)

//ruta para la seccion de productos
navegarRouter.get('/productos', navegarProductos)

//ruta para la seccion de usuarios
navegarRouter.get('/usuarios',navegarUsuarios)

//rutas de navegacion por defecto para productos
//endpoint a la ruta de la vista para consultar 
navegarRouter.get("/consultar",navegarConsultar)

//endpoint a la ruta de la vista para registrar 
navegarRouter.get("/registrar", navegarRegistrar)

//endpoint a la ruta de la vista para actualizar 
navegarRouter.get("/actualizar", navegarActualizar)

//endpoint a la ruta de la vista para eliminar
navegarRouter.get("/eliminar",navegarEliminar)

//ruta para listar productos
navegarRouter.get("/listar", navegarAlistar)

//ruta para el indice 
navegarRouter.get("/opciones",navegarOpciones)

// ruta para la vista de no autorizado
navegarRouter.get("/noautorizado",navegarNoAutorizado)

//rutas de navegacion por defecto para usuarios
//endpoint a la ruta de la vista para consultar 
navegarRouter.get("/consultaru", navegarConsultarUsuarios)

//endpoint a la ruta de la vista para registrar 
navegarRouter.get("/registraru",navegarRegistrarUsuarios)

//endpoint a la ruta de la vista para actualizar 
navegarRouter.get("/actualizaru", navegarActualizarUsuarios)

//endpoint a la ruta de la vista para eliminar
navegarRouter.get("/eliminaru", navegarEliminarUsuarios)

//endpoint para mostrar la vista de login
navegarRouter.get("/", navegarLogin)

//ruta hacia el index.ejs
navegarRouter.get("/",navegarAindex)

//fin de rutas de navegacion

module.exports = navegarRouter