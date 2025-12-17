//crear la conexion a la base de datos mysql

//importamos el modulo mysql2
const mysql = require('mysql2');

//creamos la conexion  a la base de datos
const conexionbd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyectoapi'
});

//exportamos la conexion
module.exports = conexionbd;