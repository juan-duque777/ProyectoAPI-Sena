
//buscar y capturar boton de registro
// const registrarbtn = document.getElementById("registrar")
// registrarbtn.addEventListener("click", registroproducto)

//pedirId()

document.getElementById("registrar").addEventListener("click", (e)=>{
    e.preventDefault()
    registroproducto()
})

// function pedirId() {
//     //definimos la ruta para recuperar los datos de los productos
//     let url = "/productos/consultar"

//     fetch(url)
//         .then(respuesta => respuesta.json())
//             .then(datos=>{
//                 //capturamos el tamaño del vector
//                 let tam = datos.length
//                 //capturamos el ultimo indice del vector
//                 let ultimo = datos[tam-1]
//                 //al valor del ultimo indice en su clave id le sumamos 1
//                 let ultiid = parseInt(ultimo.id) + 1
//                 //capturamos el campo html para el id 
//                 let id = document.getElementById("id")
//                 //al campo le asignamos el valor del ultimo id +1
//                 id.value = ultiid
//                 id.readOnly = true
//             })
// }


// async function registroproducto() {
//     //buscar y capturar el formulario
//     const formulario = document.getElementById("formupost")

//     let datos = new FormData(formulario)  //creamos una instacia de FormData y le asociamos nuestro formulario

//     // let datosjson = Object.fromEntries(datos.entries())  //capturamos los datos ingresados por el usuario

//     // if (!datosjson.nombre || !datosjson.descripcion || !datosjson.precio || !datosjson.cantidad) {
        
//     // }

//     const urlpeticion ="/productos/registrar"

//     const config = {
//         method: "POST",
//         body: datos
//     }

//     let peticion = await fetch(urlpeticion,config)

//     let valores = await peticion.json()
//     //alert de confirmacion de recepcion de la respuesta
//     Swal.fire({
//     title: "Producto Registrado",
//     icon: "success",
//     draggable: true
//     });
//     //hacer un reset al formulario
//     document.getElementById("formupost").reset()
//     //pedir el id del ultimo producto 
//     // pedirId()
//     console.log("respuesta desde el servidor", valores)

// }