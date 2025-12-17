// controladores para manejar las operaciones relacionadas con productos

const fs = require("fs")
const path = require("path")

const {
    consultarProductos
    ,consultarProductoPorNombre
    ,registrarProducto
    ,eliminarProducto
    ,actualizarPrecioProducto
}= require("../model/modelodb")

// //leer productos actualizados 
// function traerProductos(){
//     const data = fs.readFileSync(path.join(global._basedir, "public/data/productos.json"), "utf8")
//     return data
// }

//consultar todos los productos desde la base de datos
async function traerProductos(){
    try{
        return await consultarProductos()
    }catch(error){
        console.log("error al consultar los productos", error)
    }
}

// //controlador para consultar todos los productos de datos json
// const consultarProductosController = (req,resp) =>{
//     const productos = JSON.parse(traerProductos())
//     resp.json(productos)
// }

//controlador para consulta desde la base de datos por nombre
const consultarProductosController = async (req,resp) =>{
    const productos =  await traerProductos()
    resp.json(productos)
}


const consultarProductosPorNombreController = async (req,resp)=>{
    //capturar el valor que trae la peticion
    //let nombrepeticion = req.params.nombre

    //recibir la variable locals desde el midlleware 
    let textoCapital = resp.locals.textoValido

    const productos = await consultarProductoPorNombre(textoCapital)

    resp.json(productos)
}

// const registrarProductoController = (req,resp) =>{
//     let id = parseInt(req.body.id),
//         nombre = req.body.nombre,
//         descripcion = req.body.descripcion,
//         precio = parseFloat(req.body.precio),
//         cantidad = parseInt(req.body.cantidad),
//         fotosp = req.files

//         let imagenes = fotosp.map(file => file.filename)

//         let productos = JSON.parse(traerProductos())

//         productos.data.push({
//             id,nombre,descripcion,precio,cantidad, fotos : imagenes
//         })

//         let datos = path.join(global._basedir, "public/data/productos.json")

//         fs.writeFileSync(datos, JSON.stringify(mibdp, null, 2));

//         resp.send(mibdp)
// }

//controlador para registrar producto en la base de datos
const registrarProductoController = async (req,resp) =>{
    let nombre = req.body.nombre,
        descripcion = req.body.descripcion,
        precio = parseFloat(req.body.precio),
        cantidad = parseInt(req.body.cantidad)
        // fotosp = req.files

        // let imagenes = fotosp.map(file => file.filename)

        await registrarProducto(nombre,descripcion,precio,cantidad)

        //respuesta a la vista
        resp.json({message:"producto registrado exitosamente"})
}

// //controlador para eliminar producto en el json
// const eliminarProductoController = (req,resp)=>{
//     //capturamos el parametro del id que viene de la peticion
//     let id = parseInt(req.params.id)

//     let productos = JSON.parse(traerProductos())

//     const indiceProducto = productos.findIndex((producto) => producto.id === id)

//     if (indiceProducto === -1) {
//         return resp.status(404).json({error: "producto no encontrado"})
//     }else{
//         productos.splice(indiceProducto, 1)
//     }

//     let datos = path.join(global._basedir, "public/data/productos.json")
//     fs.writeFileSync(datos, JSON.stringify(productos));


//     return resp.json({ success: true, productos: productos });
// }

//controlador para eliminar producto en la base de datos
const eliminarProductoController = async (req,resp)=>{
    //capturamos el parametro del id que viene de la peticion
    let id = parseInt(req.params.id)

    await eliminarProducto(id)

    return resp.json({ message: "producto eliminado exitosamente" });
}

// //controlador para actualizar producto del json
// const actualizarProductoController = (req,resp)=>{
//     //capturamos el parametro del id que viene en la peticion lo interpretamos como entero
//     let id = parseInt(req.params.id)

//     //capturamos el precio que viene en el cuerpo de la peticion 
//     let precio = parseFloat(req.body.precio)

//     let productos = JSON.parse(traerProductos())

//     //buscamos el producto por medio del id 
//     const producto = mibdp.find((producto) => producto.id === id)

//     //si existe el producto, modificamos el precio y le asignamos el valor capturado del cuerpo de la peticion
//     producto.precio = precio 

//     let datos = JSON.stringify(productos)
//     try{
//         fs.writeFileSync("./public/data/productos.json", datos)
//     }catch(error){
//         console.log("error al actualizar el producto", error)
//     }
//     return resp.send(producto)
// }

//controlador para actualizar producto en la base de datos
const actualizarProductoController = async (req,resp)=>{
    //capturamos el parametro del id que viene en la peticion lo interpretamos como entero
    let id = parseInt(req.params.id)
    //capturamos el precio que viene en el cuerpo de la peticion 
    let precio = req.body.precio
    await actualizarPrecioProducto(id,precio)
    return resp.json({ message: "producto actualizado exitosamente" });
}

//controlador para listar productos
const listarProductosController = (req, resp) => {
    const productos = JSON.parse(traerProductos())
    resp.json(productos)
}   


//exportamos las funciones del controlador

module.exports = {
    consultarProductosController,
    consultarProductosPorNombreController,
    registrarProductoController,
    eliminarProductoController,
    actualizarProductoController,
    listarProductosController
    }