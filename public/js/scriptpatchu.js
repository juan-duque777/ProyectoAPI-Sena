//capturamos boton para recuperar los datos del producto 
//por medio de una consulta al EndPoint GET de productos 

document.getElementById("enviaru").addEventListener("click", (e) => {
    e.preventDefault()
    //capturamos el valor del input para pasar el nombre del producto 
    //a la funcion que realiza la cosulta 
    let dato = document.getElementById("dato0u").value
    getDatos(dato)
})

//funcion asincrona para recuperar los datos del producto
async function getDatos(dato){
    //ruta al endpoint GET para los productos, se pasa el nombre como parametro en la ruta de la peticion
    let url = `/usuarios/consultaru/${dato}`
    //realizamos la peticion y almacenamos la respuesta
    let respuesta = await fetch(url)
    //tomamos los datos de la respuesta y los interpretamos como JSON para operarlos como objeto de JS
    let datos = await respuesta.json()

    //mostrar los datos en la vista 
    let id = document.getElementById("dato1u")
    id.value = datos.id
    //los datos recuperados y que no deseamos modificar se bloquean asigando true a la propiedad disabled 
    id.disabled = true
    let nombres = document.getElementById("nombres")
    nombres.value = datos.nombres
    //campo bloqueado
    nombres.disabled = true
    let nombreusuario = document.getElementById("nombreusuario")
    nombreusuario.value = datos.nombreusuario
    //campo bloqueado
    nombreusuario.disabled = true
    //como el precio es el que se desea modificar no se bloquea el campo 
    let password = document.getElementById("password")
    password.value = datos.password
    let correo  = document.getElementById("correo")
    correo.value = datos.correo
    //campo bloqueado
    correo.disabled = true
        let telefono  = document.getElementById("telefono")
    telefono.value = datos.telefono
    //campo bloqueado
    telefono.disabled = true
        let rol  = document.getElementById("rol")
    rol.value = datos.rol
    //campo bloqueado
    rol.disabled = true
}

//capturar el boton para enviar la actualizancion del precio
document.getElementById("actualizaru").addEventListener("click",(e)=>{
    e.preventDefault()

    patchDatos()
})

//funcion asincrona para actualizar el precio del producto
async function patchDatos() {
    //capturar el formulario para obtener los datos 
    const formulario = document.getElementById("formupatchu")
    //obtenemos las claves valor del formulario por medio de formData
    let datos = new FormData(formulario)
    //convertimos los datos a un objeto para enviarlos en el cuerpo de la peticion
    let datosjson = Object.fromEntries(datos.entries())

    //capturamos el id del producto para actualizar 
    let id = document.getElementById("dato1u").value

    //ruta al endpoint PATCH para actualizar el precio del producto se pasa el id como parametro en la ruta de la peticion 
    let url = `/usuarios/actualizaru/${id}`

    //organizamos el metodo, los headers y el cuerpo de la peticion 
    const config = {
        method: 'PATCH',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(datosjson)
    }

    //realizamos la peticion y almacenamos la respuesta 
    let peticion = await fetch(url,config)
    //tomamos los datos de la respuesta y los interpretamos para operarlos como un obejto de JS
    let valores = await peticion.json()
    //mostramos un mensaje de confirmacion
    alert("el precio del producto se ha actualizado")
    //mostramos en la consola la respuesta del servidor
    console.log("respuesta del servidor",valores)
}