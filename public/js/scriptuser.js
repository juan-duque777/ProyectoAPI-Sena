document.getElementById("registrar").addEventListener("click", (e) =>{
    e.preventDefault()
    registroUsuario()
})


async function registroUsuario() {
    const formulario = document.getElementById("formupost")

    let datos = new FormData(formulario)

    let datosjson = Object.fromEntries(datos.entries())

    const urlpeticion ="/registraru"

        const config = {
        method: "POST",
        headers:{
            "content-type":"application/json",
        },
        body: JSON.stringify(datosjson)
    }

    let peticion = await fetch(urlpeticion,config)
    
        let valores = await peticion.json()
    //alert de confirmacion de recepcion de la respuesta
    alert("Usuario Registrado")
    //hacer un reset al formulario
    document.getElementById("formupost").reset()
    //pedir el id del ultimo producto 
    // pedirId()
    console.log("respuesta desde el servidor", valores)
}