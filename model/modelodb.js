//metodos de consulta a la base de datos mysql

//importar la conexion a la base de datos
const conexionbd = require('../database/conexion');

//creamos los metodos para las consultas de la base de datos

//metodo para obtener todos los registros de una tabla productos, con promesas
async function consultarProductos() {
    return new Promise((resuelta, rechazada)=>{
        conexionbd.query('SELECT * FROM productos', (error, registros)=>{
            if (error) {
                rechazada(error);
            }else{
                resuelta(registros);
            }
        });
    })
}

//metodo para consultar un producto por nombre
async function consultarProductoPorNombre(nombre) {
    return new Promise((resuelta, rechazada)=>{
        conexionbd.query('SELECT * FROM productos WHERE nombre = (?)', [nombre], (error, registro)=>{
            if (error) {
                rechazada(error);
            }else{
                resuelta(registro);
            }
        });
    })
}

//metodo para registrar un nuevo producto
async function registrarProducto(nombre,descripcion,precio,cantidad) {
    return new Promise((resuelta, rechazada)=>{
        conexionbd.query("INSERT INTO productos (nombre,descripcion,precio,cantidad) VALUES (?, ?, ?, ?)", [nombre,descripcion, precio,cantidad],(error)=>{
            if (error) {
                rechazada(error);
            }else{
                resuelta();
            }
        });
    })
}

//metodo para eliminar un producto por id
async function eliminarProducto(id) {
    return new Promise((resuelta, rechazada)=>{
        conexionbd.query('DELETE FROM productos WHERE id = (?)', [id], (error)=>{
            if (error) {
                rechazada(error);
            }else{
                resuelta();
            }
        })
    })
}

//metodo para actualizar el precio de un producto por id

async function actualizarPrecioProducto(id,precio) {
    return new Promise((resuelta, rechazada)=>{
        conexionbd.query('UPDATE productos SET precio = (?) WHERE id = (?)', [precio,id], (error)=>{
            if (error) {
                rechazada(error);
            }else{
                resuelta();
            }
        })
    })
}

module.exports = {
    consultarProductos
    ,consultarProductoPorNombre
    ,registrarProducto
    ,eliminarProducto
    ,actualizarPrecioProducto
};