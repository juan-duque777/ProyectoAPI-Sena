const express = require("express")
const cors = require("cors")
//creamos una constante para capturar el modulo productosRouter exportado desde routerproductos
const routerProductos = require("./productosroutes/routerproductos")
const routerUsuarios = require("./usuariosroutes/routerusuarios")
const routerNavegar = require("./navegaroutes/routernavegar")

//creamos una constante para asignar el USO del router de productos 
const rutas = express.Router()

rutas.use(express.json())
rutas.use(express.text())
rutas.use(cors())
//nuestra mini aplicacion hara uso del router creado para los productos 
rutas.use(routerProductos)
rutas.use(routerUsuarios)
rutas.use(routerNavegar)

module.exports = rutas

