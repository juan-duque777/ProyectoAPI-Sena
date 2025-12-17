// controlador para la navegacion de las vistas


//para servir archivos estaticos
const path = require("path")

//importamos jwt y el secret desde .env
const jwt = require("jsonwebtoken")
const secret = process.env.SECRETJWT

// //objeto javascript con claves de usuario y valores de servidor
// const rutas = {
//     "noautorizado":"/noautorizado",
//     "login":"/",
//     "consultar":"/consultar",
//     "registrar":"/registrar",
//     "actualizar":"/actualizar",
//     "eliminar":"/eliminar",
//     "listar":"/listar",
    
//     "consultaru":"/consultaru",
//     "registraru":"/registraru",
//     "actualizaru":"/actualizaru",
//     "eliminaru":"/eliminaru",
// }

//metodo para verificar el cokiee
function verificarCookie(req, resp, ruta) {
        const token = req.cookies.token
        if (!token) {
            console.log("no hay token", error.message)
            return resp.redirect("/")
        }
        //verificar el token en la cookie
        jwt.verify(token, secret, (error, datos)=>{
            if (error) return resp.redirect("/")
            //resp.sendFile(path.join(global._basedir, ruta))
        resp.render(ruta)
        })
}

// //controlador para la seleccion de vistas
// const navegarVista = (req,resp) =>{
//     //recibo como clave del cliente ruta que contiene el data-value del boton que se oprimio 
//     let ruta = req.body.ruta  // o consultar o registrar o actualizar o eliminar 
//     // console.log(ruta)
//     if (rutas[ruta]) {
//         resp.json({
//             success: true,
//             ruta: rutas[ruta]
//         })
//     }else{
//         resp.json({
//             success: false,
//             message: "ruta no disponible"
//         })
//     }
// }


//controlador para consultar
const navegarConsultar = (req, resp) => {
    const ruta = "index_get"
    verificarCookie(req, resp, ruta)
}   

const navegarRegistrar = (req, resp) => {
    const ruta = "index_post"
    verificarCookie(req, resp, ruta)
}   

//controlador para actualizar
const navegarActualizar = (req, resp) => {
    const ruta = "index_patch"
    verificarCookie(req, resp, ruta)
}

//controlador para eliminar
const navegarEliminar = (req, resp) => {
    const ruta = "index_delete"
    verificarCookie(req, resp, ruta)
}

//controlador para opciones
const navegarOpciones = (req,resp)=>{
        //resp.sendFile(path.join(global._basedir, "indice"))
        resp.render("indice")
}

// //controlador para la ruta de raiz (login)
const navegarLogin = (req, resp) => {
   // resp.sendFile(path.join(global._basedir, "index"))
    resp.render("index")
}

//controlador para la seccion de productos
const navegarProductos = (req, resp) => {
    //resp.sendFile(path.join(global._basedir, "seccionp"))
    resp.render("seccionp")
}

//controlador para la seccion de usuarios
const navegarUsuarios = (req, resp) => {
    resp.sendFile(path.join(global._basedir, "public/views/seccionu.html"))
}

//controlador para la vista de no autorizado
const navegarNoAutorizado = (req,resp)=>{
    //resp.sendFile(path.join(global._basedir, "noautenticado"))
    resp.render("noautenticado")
}

//controlador para consultar usuarios
const navegarConsultarUsuarios = (req, resp) => {
    const ruta = "public/views/index_get_u.html"
    verificarCookie(req, resp, ruta)
}   

//controlador para registrar usuarios
const navegarRegistrarUsuarios = (req, resp) => {
    const ruta = "public/views/index_post_u.html"
    verificarCookie(req, resp, ruta)
}

//controlador para actualizar usuarios
const navegarActualizarUsuarios = (req, resp) => {
    const ruta = "public/views/index_patch_u.html"
    verificarCookie(req, resp, ruta)
}

//controlador para eliminar usuarios
const navegarEliminarUsuarios = (req, resp) => {
    const ruta = "public/views/index_delete_u.html"
    verificarCookie(req, resp, ruta)
}

const navegarAlistar = (req, resp) => {
    //resp.sendFile(path.join(global._basedir, "public/views/listar_productos.html"))
    resp.render("listar_productos")
}

navegarAindex = (req, resp) => {
    resp.render("index")
}


//exporto los controladores de navegacion
module.exports = {
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
}