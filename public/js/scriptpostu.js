
//buscar y capturar boton de registro
// const registrarbtn = document.getElementById("registrar")
// registrarbtn.addEventListener("click", registroproducto)

pedirId()

document.getElementById("registraru").addEventListener("click", (e)=>{
    e.preventDefault()
    registrousuario()
})

function pedirId() {
    //definimos la ruta para recuperar los datos de los productos
    let url = "/usuarios/consultaru"

    fetch(url)
        .then(respuesta => respuesta.json())
            .then(datos=>{
                //capturamos el tamaño del vector
                let tam = datos.length
                //capturamos el ultimo indice del vector
                let ultimo = datos[tam-1]
                //al valor del ultimo indice en su clave id le sumamos 1
                let ultiid = parseInt(ultimo.id) + 1
                //capturamos el campo html para el id 
                let id = document.getElementById("id")
                //al campo le asignamos el valor del ultimo id +1
                id.value = ultiid
                id.readOnly = true
            })
}


async function registrousuario() {
    //buscar y capturar el formulario
    const formulario = document.getElementById("formupostu")

    let datos = new FormData(formulario)  //creamos una instacia de FormData y le asociamos nuestro formulario

    //let datosjson = Object.fromEntries(datos.entries())  //capturamos los datos ingresados por el usuario

    const urlpeticion ="/usuarios/registraru"

    const config = {
        method: "POST",
        body: datos
    }

    let peticion = await fetch(urlpeticion,config)

    let valores = await peticion.json()
    //alert de confirmacion de recepcion de la respuesta
    Swal.fire({
    title: "Drag me!",
    icon: "success",
    draggable: true
    //hacer un reset al formulario
}).then(()=>{
    document.getElementById("formupostu").reset()
    //pedir el id del ultimo producto 
    pedirId()
    console.log("respuesta desde el servidor", valores)
})
}