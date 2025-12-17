// Capturar el componente botón del formulario
document.getElementById("enviaru").addEventListener("click", (e) => {
    e.preventDefault()

    let dato1 = document.getElementById("dato1u").value
    pedirDatos(dato1)
})

let exito = document.getElementById("exito")
let error = document.getElementById("error")
let datostabla = document.querySelectorAll("#datostabla td")

// ------------------ Función para pedir datos ------------------
async function pedirDatos(dato1) {
    const url = `/usuarios/consultaru/${dato1}`
    
    try {
        const respuesta = await fetch(url)

        if (!respuesta.ok) {
            mostrarError()
            return
        }else{

        const datos = await respuesta.json()
        mostrarDatos(datos)
        document.getElementById("nombresu").value = ""
        }
    } catch (err) {
        mostrarError()
    }
}

// ------------------ Mostrar datos en pantalla ------------------
function mostrarDatos(datos) {
    document.getElementById("idu").textContent = datos.id
    document.getElementById("nombresu").textContent = datos.nombres
    document.getElementById("nombreusuario").textContent = datos.nombreusuario
    document.getElementById("passwordu").textContent = datos.password
    document.getElementById("correou").textContent = datos.correo
    document.getElementById("telefonou").textContent = datos.telefono
    document.getElementById("rolu").textContent = datos.rol
    //componente para la foto de perfil 
    let foto = document.getElementById("fotou")
    //creamos el componente de tipo img para la imagen
    let fotoperfil = document.createElement("img")
    let fotouser = datos.foto.replace(/^public\\/g, '../')
    fotoperfil.src = fotouser
    fotoperfil.width = 50
    foto.innerHTML = ""
    foto.appendChild(fotoperfil)

    exito.textContent = "✅ La consulta fue exitosa"
    error.textContent = ""
}

// ------------------ Mostrar error ------------------
function mostrarError() {
    exito.textContent = ""
    error.textContent = "❌ El producto no existe"
    
    datostabla.forEach((datos)=>{
        datos.textContent = ""
    })
}