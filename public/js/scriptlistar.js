//capturar el boton y procesar la peticion para listar productos
document.getElementById("listar").addEventListener("click", (e)=>{
    e.preventDefault()

    //listarProductos()


    $("#tablaDatos").DataTable({
        //mediante el parametro ajax hacemos la peticion a la ruta de listar productos
        ajax: "/productos/listar",
        //componentes data para los registros
        columns: [
            { data: "id" },
            { data: "nombre" },
            { data: "descripcion" },
            { data: "precio" },
            { data: "cantidad" }
        ],
        //parametros de configuracion de dataTable
        //listado con paginacion de 5 en 5
        pageLength: 5,
        lengthMenu: [[5, 10, 20],[5, 10, 20]],
        //parametros de idioma español
        language: {
            processing:     "Procesando...",
            //campo de busqueda
            search:         "Buscar:",
            lengthMenu:    "Mostrar _MENU_ registros",
            info:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty:      "Mostrando registros del 0 al 0 de un total de 0 registros",
            paginate: {
                first:      "Primero",
                last:       "Último",
                next:       "Siguiente",
                previous:   "Anterior"
            }
        }
    })

    //instanciamos dataTable
    let table = new DataTable("#tablaDatos")
})

// async function listarProductos() {
    
//     let url = "/productos/listar"

//     let respuesta = await fetch(url)

//     let datos = await respuesta.json()

//     const tbody = document.getElementById("tbody")

//     datos.forEach(producto =>{
//         //creamos la fila para cada producto
//         let fila = document.createElement("tr")
//         //cramos las celdas para cada atributo del producto
//         const celdaId = document.createElement("td")
//         celdaId.textContent = producto.id
//         const celdaNombre = document.createElement("td")
//         celdaNombre.textContent = producto.nombre
//         const celdaDescripcion = document.createElement("td")
//         celdaDescripcion.textContent = producto.descripcion
//         const celdaPrecio = document.createElement("td")
//         celdaPrecio.textContent = producto.precio
//         const celdaCantidad = document.createElement("td")
//         celdaCantidad.textContent = producto.cantidad

//         //insertar en la fila las celdas de los valores
//         fila.appendChild(celdaId)
//         fila.appendChild(celdaNombre)
//         fila.appendChild(celdaDescripcion)
//         fila.appendChild(celdaPrecio)
//         fila.appendChild(celdaCantidad)

//         tbody.appendChild(fila)
//     })
// }
