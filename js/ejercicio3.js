const listaProductos = [
    { id: 1, nombre: "Teclado", categoria: "Accesorios", precio: 85000, stock: 15 },
    { id: 2, nombre: "Mouse", categoria: "Accesorios", precio: 45000, stock: 20 },
    { id: 3, nombre: "Monitor", categoria: "Tecnología", precio: 650000, stock: 4 },
    { id: 3, nombre: "Camiseta programador", categoria: "Hogar", precio: 75000, stock: 5 },
     { id: 4, nombre: "Computador", categoria: "Tecnología", precio: 1850.000, stock: 8 }
];

//Vamos a crear unas constantes que permitan generar un codigo más limpio
const formularioProducto = document.getElementById("formularioProducto");
const campoBusqueda = document.getElementById("buscar");
const filtroCategoria = document.getElementById("filtroCategoria");
const tablaProductos = document.getElementById("tablaProductos");
const mensaje = document.getElementById("mensaje");
const formatoMoneda = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
});

function actualizarResumen()
{
    const valorInventario = listaProductos.reduce(
        (total, producto) => total + producto.precio * producto.stock,
        0
    );
    const productoMasCostoso = listaProductos.reduce(
        (masCostoso, producto) => producto.precio > masCostoso.precio ? producto : masCostoso,
        listaProductos[0]
    );
    const productosConPocoStock = listaProductos.filter(producto => producto.stock < 10);

    document.getElementById("totalProductos").textContent = listaProductos.length;
    document.getElementById("valorInventario").textContent = formatoMoneda.format(valorInventario);
    document.getElementById("productoCostoso").textContent = productoMasCostoso
        ? `${productoMasCostoso.nombre} - ${formatoMoneda.format(productoMasCostoso.precio)}`
        : "Sin productos";
    document.getElementById("pocoStock").textContent = productosConPocoStock.length;
}

function actualizarTabla()
{
    const busqueda = campoBusqueda.value.trim().toLocaleLowerCase("es");
    const categoriaSeleccionada = filtroCategoria.value;
    const productosFiltrados = listaProductos.filter(producto => {
        const coincideNombre = producto.nombre.toLocaleLowerCase("es").includes(busqueda);
        const coincideCategoria = categoriaSeleccionada === "" ||
            producto.categoria === categoriaSeleccionada;

        return coincideNombre && coincideCategoria;
    });

    tablaProductos.textContent = "";

    productosFiltrados.forEach(producto => {
        const fila = document.createElement("tr");
        const subtotal = producto.precio * producto.stock;
        const valores = [
            producto.id,
            producto.nombre,
            producto.categoria,
            formatoMoneda.format(producto.precio),
            producto.stock,
            formatoMoneda.format(subtotal)
        ];

        valores.forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        tablaProductos.appendChild(fila);
    });

    mensaje.textContent = productosFiltrados.length === 0
        ? "No se encontraron productos."
        : "";
}

formularioProducto.addEventListener("submit", event => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value;
    const precio = Number(document.getElementById("precio").value);
    const stock = Number(document.getElementById("stock").value);

    if (nombre === "" || categoria === "" || !Number.isFinite(precio) ||
        precio <= 0 || !Number.isInteger(stock) || stock < 0)
    {
        mensaje.textContent = "Ingresa un nombre, categoría, precio y stock válidos.";
        return;
    }

    const nuevoId = listaProductos.reduce(
        (mayorId, producto) => Math.max(mayorId, producto.id),
        0
    ) + 1;

    listaProductos.push({ id: nuevoId, nombre, categoria, precio, stock });
    formularioProducto.reset();
    actualizarResumen();
    actualizarTabla();
    mensaje.textContent = `Producto "${nombre}" registrado correctamente.`;
});

campoBusqueda.addEventListener("input", actualizarTabla);
filtroCategoria.addEventListener("change", actualizarTabla);

actualizarResumen();
actualizarTabla();