//traer todos los metodos o funciones del front

//metodo de login
export async function loginPost(datosjson){
    const urllogin =  "/usuarios/login" 

    const config = {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(datosjson)
    }

    try{
        //realizo la peticion a la rutalogin con el formato de config
        let peticion = await fetch(urllogin, config)

        let valores = await peticion.json()

        if (!peticion.ok){
            Swal.fire({
                icon: "error",
                title: "Error en las crendenciales",
                text: "Valide los datos ingresados!",
                footer: '<p style="color:red">el usuario o el password son incorrectos</p>'
                })
            return
        }

        Swal.fire({
        title: "¡Bienvenido!",
        icon: "success",
        draggable: true
        }).then(() => {
        let usuario = valores.nombreus
        let token = valores.token
        sessionStorage.setItem(usuario, token)

        //guardamos el token en una cookie
        //path=/ para que la cookie este disponible en toda la aplicacion
        document.cookie = `token=${token}; path=/`

        //hacemos la redireccion a la pagina de opciones
        window.location = `/opciones?usuario=${usuario}`
        })

    }catch(error){
        alert("Error en la conexion")
        console.error("error",error)
    }
}

//metodo para patch actualizar el precio del producto
//funcion asincrona para recuperar los datos del producto
export async function getDatos(dato){
    //ruta al endpoint GET para los productos, se pasa el nombre como parametro en la ruta de la peticion
    let url = `/productos/consultar/${dato}`
    //realizamos la peticion y almacenamos la respuesta
    let respuesta = await fetch(url)
    //tomamos los datos de la respuesta y los interpretamos como JSON para operarlos como objeto de JS
    let datos = await respuesta.json()

    let producto = datos[0]

    //mostrar los datos en la vista 
    let id = document.getElementById("dato1")
    id.value = producto.id
    //los datos recuperados y que no deseamos modificar se bloquean asigando true a la propiedad disabled 
    id.disabled = true
    let nombre = document.getElementById("dato2")
    nombre.value = producto.nombre
    //campo bloqueado
    nombre.disabled = true
    let descripcion = document.getElementById("dato3")
    descripcion.value = producto.descripcion
    //campo bloqueado
    descripcion.disabled = true
    //como el precio es el que se desea modificar no se bloquea el campo 
    let precio = document.getElementById("dato4")
    precio.value = producto.precio
    let cantidad  = document.getElementById("dato5")
    cantidad.value = producto.cantidad
    //campo bloqueado
    cantidad.disabled = true
}

//metodo para patch actualizar el precio del producto
//funcion asincrona para actualizar el precio del producto
export async function patchDatos() {
    //capturar el formulario para obtener los datos 
    const formulario = document.getElementById("formupatch")
    //obtenemos las claves valor del formulario por medio de formData
    let datos = new FormData(formulario)
    //convertimos los datos a un objeto para enviarlos en el cuerpo de la peticion
    let datosjson = Object.fromEntries(datos.entries())

    //capturamos el id del producto para actualizar 
    let id = document.getElementById("dato1").value

    //ruta al endpoint PATCH para actualizar el precio del producto se pasa el id como parametro en la ruta de la peticion 
    let url = `/productos/actualizar/${id}`

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

// metodo para seccionp
// funcion asincrona para hacer la peticion de las rutas al servidor
export async function rutasMenu(rutaUrl) {

//     const url = "/rutas"

//     const config = {
//         method: 'POST',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({"ruta":rutaUrl})
//     }

//     let respuesta = await fetch(url,config)

//     let valores = await respuesta.json()

//     // console.log(valores)

//     //enviar por la url la peticion al servidor por la ruta de navegacion y recibir la ruta
//     window.location.href = valores.ruta


//objeto javascript con claves de usuario y valores de servidor
const rutas = {
    "noautorizado":"/noautorizado",
    "login":"/",
    "consultar":"/consultar",
    "registrar":"/registrar",
    "actualizar":"/actualizar",
    "eliminar":"/eliminar",
    "listar":"/listar",
    
    "consultaru":"/consultaru",
    "registraru":"/registraru",
    "actualizaru":"/actualizaru",
    "eliminaru":"/eliminaru",
    }
    if(rutas[rutaUrl]){
        window.location.href = rutas[rutaUrl]
    }
}

//metodo para consultar producto
// ------------------ Función para pedir datos ------------------
export async function pedirDatos(dato1) {
    const url = `/productos/consultar/${dato1}`;
    
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok){
            const datos = await respuesta.json()
        if (datos.redirection) {
            window.location.href = datos.redirection
        }
        }

        const datos = await respuesta.json();

        const producto = datos[0];

        mostrarDatos(producto);

    } catch (err) {
        mostrarError();
    }
}

// ------------------ Mostrar datos en pantalla ------------------
function mostrarDatos(producto) {
    document.getElementById("idp").textContent = producto.id;
    document.getElementById("nombrep").textContent = producto.nombre;
    document.getElementById("descripcionp").textContent = producto.descripcion;
    document.getElementById("preciop").textContent = producto.precio;
    document.getElementById("cantidadp").textContent = producto.cantidad;

    // //capturar el nuevo componente 
    // let imagenes = document.getElementById("imagenesprod")

    // datos.fotos.forEach(nombreImagen => {
    //     let ruta = `assets/fotosproducto/${datos.nombre}/${nombreImagen}`
    //     let img = document.createElement("img")
    //     img.src = ruta
    //     img.width = 100
    //     imagenes.appendChild(img)
    // });

    exito.textContent = "✅ La consulta fue exitosa";
    error.textContent = "";
}

function mostrarError() {
    exito.textContent = "";
    error.textContent = "❌ El producto no existe";

    // // 👇 Limpia los campos cuando no hay producto
    // document.getElementById("idp").textContent = "";
    // document.getElementById("nombrep").textContent = ""
}

//metodo para registrar producto
export async function registroproducto() {
    //buscar y capturar el formulario
    const formulario = document.getElementById("formupost")

    let datos = new FormData(formulario)  //creamos una instacia de FormData y le asociamos nuestro formulario

    // let datosjson = Object.fromEntries(datos.entries())  //capturamos los datos ingresados por el usuario

    // if (!datosjson.nombre || !datosjson.descripcion || !datosjson.precio || !datosjson.cantidad) {
        
    // }

    const urlpeticion ="/productos/registrar"

    const config = {
        method: "POST",
        body: datos
    }

    let peticion = await fetch(urlpeticion,config)

    let valores = await peticion.json()
    //alert de confirmacion de recepcion de la respuesta
    Swal.fire({
    title: "Producto Registrado",
    icon: "success",
    draggable: true
    });
    //hacer un reset al formulario
    document.getElementById("formupost").reset()
    //pedir el id del ultimo producto 
    // pedirId()
    console.log("respuesta desde el servidor", valores)

}

let exito = document.getElementById("exito")
let error = document.getElementById("error")
let datostabla = document.querySelectorAll("#datostabla td")
//metodo para eliminar producto
export async function pedirDatose(dato1) {

    let url =`/productos/consultar/${dato1}`


    try{
        //realizamos la peticion
        let respuesta = await fetch(url)
    
        let datos = await respuesta.json()

        //como la respuesta es un array, capturamos el primer elemento
        const producto = datos[0]

        let id = document.getElementById("idp")
        id.textContent = producto.id
        let nombre = document.getElementById("nombrep")
        nombre.textContent = producto.nombre
        let descripcion = document.getElementById("descripcionp")
        descripcion.textContent = producto.descripcion
        let precio = document.getElementById("preciop")
        precio.textContent = producto.precio
        let cantidad = document.getElementById("cantidadp")
        cantidad.textContent = producto.cantidad

        //capturamos la celda de la tabla para mostrar el boton de eliminar
        let btndel = document.getElementById("btndel")
        //creamos el boton y le asociamos clase de estilo
        let botondel = document.createElement("button")
        botondel.setAttribute("class","btn border-0 botondelete mx-4")
        botondel.setAttribute("type","button")
        //inserta el boton
        btndel.appendChild(botondel)
        //deshabilitamos el boton de enviar para evitar multiples consultas
        document.getElementById('enviar').disabled = true
        //asociamos el evento al boton de eliminar
        btndel.addEventListener("click",confirmardel)
    }catch(error){

        mostrarErrore()

    }

}

//generacion del evento de eliminacion 
function confirmardel() {
    //capturamos la fila de la tabla con id confirm
    let confirmar = document.getElementById("confirm")
    //limpiamos el contenido de la fila confirm
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
    let dato = document.getElementById("idp").textContent

    let url = `/productos/eliminar/${dato}`

    let usuario = sessionStorage.key(0)
    let token = sessionStorage.getItem(usuario)

    let config = {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+ token
        }
    }

    try{
        let peticion = await fetch(url,config)

        if (!peticion.ok){
            throw new Error("Hubo un error en la peticion");
        }

        let valores = await peticion.json()

        alert("El producto se ha eliminado")
        location.reload()
        // document.getElementById("confirm").innerHTML = "";
        // document.getElementById("idp").textContent = "";
        // document.getElementById("nombrep").textContent = "";
        // document.getElementById("descripcionp").textContent = "";
        // document.getElementById("preciop").textContent = "";
        // document.getElementById("cantidadp").textContent = "";

    }catch(error){
        console.log("Error:",error)
    }

}
//confirmacion por no 
function cancelarPet() {
    alert("se ha cancelado la eliminacion del producto")
    document.getElementById("confirm").innerHTML = "";
}

function mostrarErrore() {
    exito.textContent = "Ha ocurrido un error en la peticion"
    error.textContent = ""

    datostabla.forEach((datos) => {
        datos.textContent = ""
    });
}