let listaNombre = [];

function agregarNombre()
{
    let nombre = document.getElementById("nombre").value.trim().toUpperCase();
    
    if (nombre == "")
        {
            alert("Ingrese el nombre");
            return;
        }else if (listaNombre.includes(nombre))
            {
                alert(`El nombre ${nombre} ya esta registrado`);
                return;
            } else
            {
                listaNombre.push(nombre);
                document.getElementById("nombre").value = "";
                mostrarNombre();
            }
} // Final de la función agregarNombre()

function mostrarNombre()
{
    let lista = document.getElementById("lista");
    let cantidad = document.getElementById("cantidad");
    lista.innerHTML = "";

    for (let i = 0; i  < listaNombre.length; i++)
    {
        lista.innerHTML += `<li>${listaNombre[i]}</li>`;
    }

    cantidad.textContent = `Total nombres: ${listaNombre.length}`;

}

function borrarNombre()
{
    let nombre = document.getElementById("nombre").value.trim().toUpperCase();

    if (nombre == "")
    {
        alert("Ingrese el nombre que desea borrar");
        return;
    }

    let posicion = listaNombre.indexOf(nombre);

    if (posicion == -1)
    {
        alert(`El nombre ${nombre} no se encuentra registrado`);
        return;
    }
    else
    {
        listaNombre.splice(posicion, 1);

        document.getElementById("nombre").value = "";

        mostrarNombre();

        alert(`El nombre ${nombre} fue eliminado correctamente`);
    }

} // Final de la función borrarNombre()