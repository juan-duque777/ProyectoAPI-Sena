

//capturamos boton para recuperar los datos del producto 
//por medio de una consulta al EndPoint GET de productos 

document.getElementById("enviar").addEventListener("click", (e) => {
    e.preventDefault()
    //capturamos el valor del input para pasar el nombre del producto 
    //a la funcion que realiza la cosulta 
    let dato = document.getElementById("dato0").value
    getDatos(dato)
})

// //funcion asincrona para recuperar los datos del producto
// async function getDatos(dato){
//     //ruta al endpoint GET para los productos, se pasa el nombre como parametro en la ruta de la peticion
//     let url = `/productos/consultar/${dato}`
//     //realizamos la peticion y almacenamos la respuesta
//     let respuesta = await fetch(url)
//     //tomamos los datos de la respuesta y los interpretamos como JSON para operarlos como objeto de JS
//     let datos = await respuesta.json()

//     let producto = datos[0]

//     //mostrar los datos en la vista 
//     let id = document.getElementById("dato1")
//     id.value = producto.id
//     //los datos recuperados y que no deseamos modificar se bloquean asigando true a la propiedad disabled 
//     id.disabled = true
//     let nombre = document.getElementById("dato2")
//     nombre.value = producto.nombre
//     //campo bloqueado
//     nombre.disabled = true
//     let descripcion = document.getElementById("dato3")
//     descripcion.value = producto.descripcion
//     //campo bloqueado
//     descripcion.disabled = true
//     //como el precio es el que se desea modificar no se bloquea el campo 
//     let precio = document.getElementById("dato4")
//     precio.value = producto.precio
//     let cantidad  = document.getElementById("dato5")
//     cantidad.value = producto.cantidad
//     //campo bloqueado
//     cantidad.disabled = true
// }

//capturar el boton para enviar la actualizancion del precio
document.getElementById("actualizar").addEventListener("click",(e)=>{
    e.preventDefault()

    patchDatos()
})

// //funcion asincrona para actualizar el precio del producto
// async function patchDatos() {
//     //capturar el formulario para obtener los datos 
//     const formulario = document.getElementById("formupatch")
//     //obtenemos las claves valor del formulario por medio de formData
//     let datos = new FormData(formulario)
//     //convertimos los datos a un objeto para enviarlos en el cuerpo de la peticion
//     let datosjson = Object.fromEntries(datos.entries())

//     //capturamos el id del producto para actualizar 
//     let id = document.getElementById("dato1").value

//     //ruta al endpoint PATCH para actualizar el precio del producto se pasa el id como parametro en la ruta de la peticion 
//     let url = `/productos/actualizar/${id}`

//     //organizamos el metodo, los headers y el cuerpo de la peticion 
//     const config = {
//         method: 'PATCH',
//         headers:{
//             'Content-type':'application/json'
//         },
//         body: JSON.stringify(datosjson)
//     }

//     //realizamos la peticion y almacenamos la respuesta 
//     let peticion = await fetch(url,config)
//     //tomamos los datos de la respuesta y los interpretamos para operarlos como un obejto de JS
//     let valores = await peticion.json()
//     //mostramos un mensaje de confirmacion
//     alert("el precio del producto se ha actualizado")
//     //mostramos en la consola la respuesta del servidor
//     console.log("respuesta del servidor",valores)
// }