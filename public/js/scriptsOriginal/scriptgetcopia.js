import { pedirDatos } from "./scripts/scriptsfront.js";

// Capturar el componente botón del formulario
document.getElementById("enviar").addEventListener("click", (e) => {
    e.preventDefault();


    let dato1 = document.getElementById("dato1").value;
        if (!dato1) {
        Swal.fire({
        icon: "error",
        title: "El campo esta vacio",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
});
return
    }
    pedirDatos(dato1);
});

let exito = document.getElementById("exito");
let error = document.getElementById("error");

// // ------------------ Función para pedir datos ------------------
// async function pedirDatos(dato1) {
//     const url = `/productos/consultar/${dato1}`;
    
//     try {
//         const respuesta = await fetch(url);

//         if (!respuesta.ok){
//             const datos = await respuesta.json()
//         if (datos.redirection) {
//             window.location.href = datos.redirection
//         }
//         }

//         const datos = await respuesta.json();

//         const producto = datos[0];

//         mostrarDatos(producto);

//     } catch (err) {
//         mostrarError();
//     }
// }

// // ------------------ Mostrar datos en pantalla ------------------
// function mostrarDatos(producto) {
//     document.getElementById("idp").textContent = producto.id;
//     document.getElementById("nombrep").textContent = producto.nombre;
//     document.getElementById("descripcionp").textContent = producto.descripcion;
//     document.getElementById("preciop").textContent = producto.precio;
//     document.getElementById("cantidadp").textContent = producto.cantidad;

//     // //capturar el nuevo componente 
//     // let imagenes = document.getElementById("imagenesprod")

//     // datos.fotos.forEach(nombreImagen => {
//     //     let ruta = `assets/fotosproducto/${datos.nombre}/${nombreImagen}`
//     //     let img = document.createElement("img")
//     //     img.src = ruta
//     //     img.width = 100
//     //     imagenes.appendChild(img)
//     // });

//     exito.textContent = "✅ La consulta fue exitosa";
//     error.textContent = "";
// }

// ------------------ Mostrar error ------------------
// function mostrarError() {
//     exito.textContent = "";
//     error.textContent = "❌ El producto no existe";

//     // // 👇 Limpia los campos cuando no hay producto
//     // document.getElementById("idp").textContent = "";
//     // document.getElementById("nombrep").textContent = ""
// }