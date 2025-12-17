//capturamos el boton de enviar, prevenimos su evento por defecto y llamamos a la funcion de consulta 

document.getElementById("enviaru").addEventListener("click",(e)=>{
    e.preventDefault()

    let dato1 = document.getElementById("dato1u").value

    pedirDatos(dato1)

})

//consulta de los productos 
async function pedirDatos(dato1) {

    let url =`/usuarios/consultaru/${dato1}`

    let respuesta = await fetch(url)

    let datos = await respuesta.json()

    let id = document.getElementById("idu")
    id.textContent = datos.id
    let nombresu = document.getElementById("nombresu")
    nombresu.textContent = datos.nombresu
    let nombreusuario = document.getElementById("nombreusuario")
    nombreusuario.textContent = datos.nombreusuario
    let passwordu = document.getElementById("passwordu")
    passwordu.textContent = datos.passwordu
    let correou = document.getElementById("correou")
    correou.textContent = datos.correou
    let telefonou = document.getElementById("telefonou")
    telefonou.textContent = datos.telefonou
    let rolu = document.getElementById("rolu")
    rolu.textContent = datos.rolu
    //capturamos la celda de la tabla para mostrar el boton de eliminar
    let btndel = document.getElementById("btndel")
    //creamos el boton y le asociamos clase de estilo
    let botondel = document.createElement("button")
    botondel.setAttribute("class","btn border-0 botondelete mx-4")
    botondel.setAttribute("type","button")
    //inserta el boton
    btndel.appendChild(botondel)

    btndel.addEventListener("click",confirmardel)
}
//generacion del evento de eliminacion 
function confirmardel() {
    //capturamos la fila de la tabla con id confirm
    let confirmar = document.getElementById("confirmu")
    confirmar.innerHTML = "";
    //creamos el componente td para utilizarlo dentro de confirm
    let contentconfirm = document.createElement("td")
    //definimos el atributo para el tamaño de la celda 
    contentconfirm.setAttribute("colspan",6)
    //le asociamos la clase para que el texto se centre 
    contentconfirm.setAttribute("class", "text-center")
    contentconfirm.textContent = "¿esta seguro de eliminar el producto?"
    //insertar al doom la celda contentconfirm
    confirmar.appendChild(contentconfirm)

    //crear el boton de confirmar eliminacion 
    let botonremover = document.createElement("button")
    botonremover.setAttribute("class","btn border-0 botonyes mx-4")
    //crear el boton de cancelar eliminacion
    let botoncancelar = document.createElement("button")
    botoncancelar.setAttribute("class","btn border-0 botonnot mx-4")

    //agregar los botones al dom, dentro de la celda contentconfirm
    contentconfirm.appendChild(botonremover)
    contentconfirm.appendChild(botoncancelar)

    //asociar eventos para los botones
    botonremover.addEventListener("click",eliminarDatos)
    botoncancelar.addEventListener("click",cancelarPet)

        // btndel.removeEventListener("click",confirmardel)
        enviar.removeEventListener("click",pedirDatos)
}
//confirmacion por si 
async function eliminarDatos() {
    let dato = document.getElementById("idu").textContent

    let url = `/usuarios/eliminaru/${dato}`

    let config = {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    }

    try{
        let peticion = await fetch(url,config)

        if (!peticion.ok){
            throw new Error("Hubo un error en la peticion");
        }

        let valores = await peticion.json()

        alert("El producto se ha eliminado")
        document.getElementById("confirmu").innerHTML = "";
        document.getElementById("idu").textContent = "";
        document.getElementById("nombresu").textContent = "";
        document.getElementById("nombreusuario").textContent = "";
        document.getElementById("passwordu").textContent = "";
        document.getElementById("correou").textContent = "";
        document.getElementById("telefonou").textContent = "";
        document.getElementById("rolu").textContent = "";

    }catch(error){
        console.log("Error:",error)
    }

}
//confirmacion por no 
function cancelarPet() {
    alert("se ha cancelado la eliminacion del producto")
    document.getElementById("confirmu").innerHTML = "";
}