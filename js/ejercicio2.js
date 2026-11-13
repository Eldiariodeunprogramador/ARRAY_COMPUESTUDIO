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
    tabla.innerHTML += "";

    //Ahora vamos a crear el ciclo for para que haga el recorrido.
    for (let i = 0; i < listaProductos.length; i++)
    {
        let subtotal = listaProductos[i].precio * listaProductos[i].cantidad;
        tabla.innerHTML += `<tr>
        
        <td>${listaProductos[i].nombre}</td>
        <td>${listaProductos[i].precio}</td>
        <td>${listaProductos[i].cantidad}</td>        
        <td>${subtotal}</td>
        </tr>`;
        totalNuevo += subtotal;
    }

    total.textContent = `Total: ${totalNuevo}`;
}