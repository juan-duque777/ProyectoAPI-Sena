
//capturamos los botones y generar peticiones a rutas en el servidor

document.querySelectorAll(".itemsmenu").forEach(button =>{
    button.addEventListener("click", function(e){
        e.preventDefault()

        //capturar el data-value del boton que se oprime
        let rutaUrl = this.dataset.value
        // console.log(rutaUrl)
        //se pasa el data-value del boton a la funcion de rutas
        rutasMenu(rutaUrl)
    })
})

//funcion asincrona para hacer la peticion de las rutas al servidor
async function rutasMenu(rutaUrl) {

    const url = "/rutas"

    const config = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({"ruta":rutaUrl})
    }

    let respuesta = await fetch(url,config)

    let valores = await respuesta.json()

    // console.log(valores)

    //enviar por la url la peticion al servidor por la ruta de navegacion y recibir la ruta
    window.location.href = valores.ruta
}