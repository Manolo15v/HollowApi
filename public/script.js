const API_URL = "http://localhost:8080/personajes/"; 

function obtenerPersonajes() {
    fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener personajes");
            return res.json();
        })
        .then(data => {
            const lista = document.getElementById("lista-personajes");
            lista.innerHTML = ""; 
            data.forEach(personaje => {
                const li = document.createElement("li");
                li.textContent = `${personaje.id}: ${personaje.nombre} - ${personaje.descripcion}`;
                lista.appendChild(li);
            });
        })
        .catch(err => {
            console.error("Error:", err);
            alert("No se pudieron obtener los personajes.");
        });
}

// Buscar personaje por ID
function buscarPersonaje() {
    const id = document.getElementById("buscar-id").value;
    if (!id) return alert("Por favor, ingresa un ID");

    fetch(`${API_URL}${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Personaje no encontrado");
            return res.json();
        })
        .then(personaje => {
            const detalle = document.getElementById("detalle-personaje");
            detalle.innerHTML = `<p><strong>${personaje.nombre}</strong>: ${personaje.descripcion}</p>`;
        })
        .catch(() => {
            alert("Personaje no encontrado");
            document.getElementById("detalle-personaje").innerHTML = "";
        });
}

// Agregar personaje
function agregarPersonaje() {
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;

    if (!nombre || !descripcion) return alert("Por favor, completa todos los campos");

    fetch(`${API_URL}agregar`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion })
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al agregar personaje");
        return res.text();
    })
    .then(() => {
        alert("Personaje añadido exitosamente");
        document.getElementById("nombre").value = "";
        document.getElementById("descripcion").value = "";
        obtenerPersonajes();
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Hubo un problema al añadir el personaje.");
    });
}

// Eliminar personaje
function eliminarPersonaje() {
    const id = document.getElementById("eliminar-id").value;
    if (!id) return alert("Por favor, ingresa un ID");

    fetch(`${API_URL}${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("No se pudo eliminar el personaje");
            return res.text();
        })
        .then(() => {
            alert("Personaje eliminado correctamente");
            document.getElementById("eliminar-id").value = "";
            obtenerPersonajes();
        })
        .catch(err => {
            console.error("Error:", err);
            alert("No se pudo eliminar el personaje.");
        });
}
