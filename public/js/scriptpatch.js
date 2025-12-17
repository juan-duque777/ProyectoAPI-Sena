import { getDatos } from "./scripts/scriptsfront.js";
import { patchDatos } from "./scripts/scriptsfront.js";

//capturamos boton para recuperar los datos del producto 
//por medio de una consulta al EndPoint GET de productos 

document.getElementById("enviar").addEventListener("click", (e) => {
    e.preventDefault()
    //capturamos el valor del input para pasar el nombre del producto 
    //a la funcion que realiza la cosulta 
    let dato = document.getElementById("dato0").value
    getDatos(dato)
})

//capturar el boton para enviar la actualizancion del precio
document.getElementById("actualizar").addEventListener("click",(e)=>{
    e.preventDefault()

    patchDatos()
})