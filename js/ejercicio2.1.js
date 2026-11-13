let listaProductos  = [];

// Crear la función llamada agregar productos 

function agregarProducto()
{
    let producto = document.getElementById("producto").value.trim();
    let precio = parseFloat(document.getElementById("precio").value);
    let cantidad = parseInt(document.getElementById("cantidad").value, 10);

    //Vamos a realizar un condicional IF...
    if (producto === "" || isNaN(precio) || isNaN(cantidad))
    {
        alert("Llene todos los campos");
        return;
    }

    // Lista tipoProducto push()...
    listaProductos.push({
        nombre: producto,
        precio: precio,
        cantidad: cantidad
    });

    document.getElementById("formulario").reset();
    mostrar();
}

// Vamos a crear la función mostrar()...

function mostrar()
{
    let tabla = document.getElementById("tabla");
    let total = document.getElementById("total");
    let totalNuevo = 0;
    tabla.textContent = "";

    //Ahora vamos a crear el ciclo for para que haga el recorrido.
    for (let i = 0; i < listaProductos.length; i++)
    {
        let subtotal = listaProductos[i].precio * listaProductos[i].cantidad;
        let fila = document.createElement("tr");

        [listaProductos[i].nombre, listaProductos[i].precio, listaProductos[i].cantidad, subtotal]
            .forEach(valor => {
                let celda = document.createElement("td");
                celda.textContent = valor;
                fila.appendChild(celda);
            });

        tabla.appendChild(fila);
        totalNuevo += subtotal;
    }

    total.textContent = `Total: ${totalNuevo}`;
}

function borrarProducto()
{
    let nombreProducto = document.getElementById("producto").value.trim();

    if (nombreProducto === "")
    {
        alert("Escriba el nombre del producto que desea borrar");
        return;
    }

    let indice = listaProductos.findIndex(producto =>
        producto.nombre.toLowerCase() === nombreProducto.toLowerCase()
    );

    if (indice === -1)
    {
        alert(`No se encontró el producto "${nombreProducto}"`);
        return;
    }

    listaProductos.splice(indice, 1);
    document.getElementById("formulario").reset();
    mostrar();
}