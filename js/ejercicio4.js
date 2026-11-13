const estudiantes = [
    { nombre: "Ana García", programa: "Ingeniería de Sistemas" },
    { nombre: "Carlos Rodríguez", programa: "Administración de Empresas" },
    { nombre: "Lucía Martínez", programa: "Diseño Gráfico" },
    { nombre: "Mateo Hernández", programa: "Ingeniería Industrial" },
    { nombre: "Leonel Ospina Restrepo", programa: "Ingeniería Sistemas" },
    { nombre: "Sofía López", programa: "Contaduría Pública" }
];

const campoBusqueda = document.getElementById("buscarEstudiante");
const listaEstudiantes = document.getElementById("listaEstudiantes");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");

function mostrarEstudiantes() {
    const busqueda = campoBusqueda.value.trim().toLocaleLowerCase("es");
    const estudiantesFiltrados = estudiantes.filter(estudiante =>
        estudiante.nombre.toLocaleLowerCase("es").includes(busqueda)
    );

    listaEstudiantes.textContent = "";

    estudiantesFiltrados.forEach(estudiante => {
        const elemento = document.createElement("li");
        elemento.textContent = `${estudiante.nombre} — ${estudiante.programa}`;
        listaEstudiantes.appendChild(elemento);
    });

    resultadoBusqueda.textContent = estudiantesFiltrados.length === 0
        ? "No se encontraron estudiantes."
        : `${estudiantesFiltrados.length} estudiante${estudiantesFiltrados.length === 1 ? "" : "s"} encontrado${estudiantesFiltrados.length === 1 ? "" : "s"}.`;
}

campoBusqueda.addEventListener("input", mostrarEstudiantes);
mostrarEstudiantes();