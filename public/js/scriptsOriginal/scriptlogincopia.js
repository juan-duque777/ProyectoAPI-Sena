//importar modulos en formato ECMAScript
import{ loginPost } from "./scripts/scriptsfront.js"

//capturamos el boton de login y prevenimos su evento por defecto y cargamos la funcion de login
document.getElementById("logear").addEventListener("click",(e)=>{
    e.preventDefault()

    
    //buscamos y capturamos en formulogin el fomulario html
    const formuLogin = document.getElementById("loginform")
    //instanciamos un nuevo objeto de tipo formData y le asignamos el fomulario de login
    let datos = new FormData(formuLogin)
    //capturamos solo lo que el usuario digita como valor en los campos de texto 
    let datosjson = Object.fromEntries(datos.entries())
    //pasar como parametro los valores que digito el usuario a la funcion loginPost()
    loginPost(datosjson)
})

// async function loginPost(datosjson) {
//     const urllogin =  "/usuarios/login" 

//     const config = {
//         method: "POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(datosjson)
//     }

//     try{
//         //realizo la peticion a la rutalogin con el formato de config
//         let peticion = await fetch(urllogin, config)

//         let valores = await peticion.json()

//         if (!peticion.ok){
//             Swal.fire({
//                 icon: "error",
//                 title: "Error en las crendenciales",
//                 text: "Valide los datos ingresados!",
//                 footer: '<p style="color:red">el usuario o el password son incorrectos</p>'
//                 })
//             return
//         }

//         Swal.fire({
//         title: "¡Bienvenido!",
//         icon: "success",
//         draggable: true
//         }).then(() => {
//         let usuario = valores.nombreus
//         let token = valores.token
//         sessionStorage.setItem(usuario, token)

//         //guardamos el token en una cookie
//         //path=/ para que la cookie este disponible en toda la aplicacion
//         document.cookie = `token=${token}; path=/`

//         //hacemos la redireccion a la pagina de opciones
//         window.location = `/opciones?usuario=${usuario}`
//         })

//     }catch(error){
//         alert("Error en la conexion")
//         console.error("error",error)
//     }
// }