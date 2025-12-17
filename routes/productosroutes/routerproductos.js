const express = require("express")
const fs = require("fs")
const path = require("path")

const mibdp = require("../../public/data/productos.json")

//creamos el enrutador (router) para productos 
const productosRouter = express.Router()

//importamos el middleware para letra capital
const capitalMidleware = require("../../middlewares/capital")

//importamos el midlleware para multiples imagenes 
const subirArchivos = require("../../middlewares/subirfotos")
const verficarToken = require("../../middlewares/validartoken")

//leer productos actualizados 
function traerProductos(){
    const data = fs.readFileSync(path.join(global._basedir, "public/data/productos.json"), "utf8")
    return data
}

//importamos los controladores
const {
    consultarProductosController,
    consultarProductosPorNombreController,
    registrarProductoController,
    eliminarProductoController,
    actualizarProductoController,
    listarProductosController
} = require("../../controllers/productosController")


//asignamos como aplicacion nuestro enrutador 
productosRouter.get("/productos/consultar", consultarProductosController)

//ruta con implementacion de middleware para letra capital del nombre producto
productosRouter.get("/productos/consultar/:nombre",verficarToken, capitalMidleware, consultarProductosPorNombreController)

//implementar la subida de multiples imagenes con multer
productosRouter.post("/productos/registrar",subirArchivos.array("imagenesp", 3),registrarProductoController)

productosRouter.patch('/productos/actualizar/:id', actualizarProductoController)

productosRouter.delete("/productos/eliminar/:id",eliminarProductoController)

productosRouter.get("/productos/listar", listarProductosController)

module.exports = productosRouter

