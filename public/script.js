const API_URL = "http://localhost:8080/personajes/";

document.getElementById("buscar-id").addEventListener("input", validarID);
document.getElementById("eliminar-id").addEventListener("input", validarID);
document.getElementById("descripcion").addEventListener("input", validarDescripcion);

const CRUD = {
    
    obtenerPersonajes() {
        fetch(API_URL)
            .then(res => res.ok ? res.json() : Promise.reject("Error al obtener personajes"))
            .then(data => {
                const lista = document.getElementById("lista-personajes");
                lista.innerHTML = "";
                data.forEach(personaje => {
                    const li = document.createElement("li");
                    li.textContent = `${personaje.id}: ${personaje.nombre} - ${personaje.descripcion}`;
                    lista.appendChild(li);
                });
            })
            .catch(err => alert(err));
    },

    buscarPersonaje() {
        const id = document.getElementById("buscar-id").value;
        if (!id) return alert("Por favor, ingresa un ID válido");

        fetch(`${API_URL}${id}`)
            .then(res => res.ok ? res.json() : Promise.reject("Personaje no encontrado"))
            .then(personaje => {
                document.getElementById("detalle-personaje").innerHTML =
                    `<p><strong>${personaje.nombre}</strong>: ${personaje.descripcion}</p>`;
            })
            .catch(err => {
                alert(err);
                document.getElementById("detalle-personaje").innerHTML = "";
            });
    },

    agregarPersonaje() {
        const nombre = document.getElementById("nombre").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();

        if (!nombre || !descripcion.match(/[a-zA-Z]/) || descripcion.length > 200) {
            return alert("Descripción inválida: debe contener letras y tener máximo 200 caracteres.");
        }

        fetch(`${API_URL}agregar`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, descripcion })
        })
        .then(res => res.ok ? res.text() : Promise.reject("Error al agregar personaje"))
        .then(() => {
            alert("Personaje añadido exitosamente");
            document.getElementById("nombre").value = "";
            document.getElementById("descripcion").value = "";
            CRUD.obtenerPersonajes();
        })
        .catch(err => alert(err));
    },

    eliminarPersonaje() {
        const id = document.getElementById("eliminar-id").value;
        if (!id) return alert("Por favor, ingresa un ID válido");

        fetch(`${API_URL}${id}`, { method: "DELETE" })
            .then(res => res.ok ? res.text() : Promise.reject("No se pudo eliminar el personaje"))
            .then(() => {
                alert("Personaje eliminado correctamente");
                document.getElementById("eliminar-id").value = "";
                CRUD.obtenerPersonajes();
            })
            .catch(err => alert(err));
    }
};

function validarID(event) {
    event.target.value = event.target.value.replace(/\D/g, "");
}

function validarDescripcion(event) {
    if (event.target.value.length > 200) {
        event.target.value = event.target.value.slice(0, 200);
    }
}
