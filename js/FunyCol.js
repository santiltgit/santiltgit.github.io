const input = document.querySelector(".agregarTarea input");
const listaTareas = document.querySelector(".listaTareas ul");
const message = document.querySelector(".listaTareas");
const contador = document.getElementById("contador");

let tareas = [];

// Cargar preferencias al iniciar
document.addEventListener("DOMContentLoaded", () => {
    cargarPreferencias();
    tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    createHtml();
});
function mostrarPopup() {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popupContent");
    const popupText = document.getElementById("popupText");

    // Usa los valores ya seleccionados por el usuario
    const preferencias = JSON.parse(localStorage.getItem("preferencias")) || {
        tamanoLetra: "16px",
        colorFondo: "#76f572",
        colorTexto: "#2c3e50"
    };

    popupText.style.fontSize = preferencias.tamanoLetra;
    popupText.style.color = preferencias.colorTexto;
    popupContent.style.backgroundColor = preferencias.colorFondo;

    popup.style.display = "flex";
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
}


// Funciones de personalización mejoradas
function cargarPreferencias() {
    const preferencias = JSON.parse(localStorage.getItem("preferencias")) || {
        tamanoLetra: "16px",
        colorFondo: "#76f572",
        colorTexto: "#2c3e50"
    };

    // Aplicar preferencias guardadas a todo el documento
    document.documentElement.style.fontSize = preferencias.tamanoLetra; // Cambiado de body a html
    document.querySelector('.section-todo-list').style.backgroundColor = preferencias.colorFondo + "a4";
    document.querySelector('.section-todo-list h1').style.color = preferencias.colorTexto;

    // Establecer valores en los controles
    document.getElementById("tamanoLetra").value = preferencias.tamanoLetra;
    document.getElementById("colorFondo").value = preferencias.colorFondo;
    document.querySelector('.section-todo-list').style.color = preferencias.colorTexto;
    document.getElementById("popupText").style.color = preferencias.colorTexto;

}

function cambiarTamanoLetra() {
    const tamano = document.getElementById("tamanoLetra").value;
    document.documentElement.style.fontSize = tamano; // Cambiado de body a html
    guardarPreferencias();
}
function cambiarColorFondo() {
    const color = document.getElementById("colorFondo").value;
    document.querySelector('.section-todo-list').style.backgroundColor = color + "a4";
    guardarPreferencias();
}

function cambiarColorTexto() {
    const color = document.getElementById("colorTexto").value;
    document.querySelector('.section-todo-list').style.color = color;
    document.getElementById("popupText").style.color = color;
    guardarPreferencias();
}


function guardarPreferencias() {
    const preferencias = {
        tamanoLetra: document.getElementById("tamanoLetra").value,
        colorFondo: document.getElementById("colorFondo").value,
        colorTexto: document.getElementById("colorTexto").value
    };
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
}

// Resto de tus funciones existentes (sin cambios)
function eventolistado() {
    listaTareas.addEventListener("change", tareaCompletada);
    listaTareas.addEventListener("click", eliminartarea);
}

function tareaCompletada(e) {
    if (e.target.type === "checkbox") {
        const tareaId = parseInt(e.target.getAttribute("tarea-id"));
        tareas = tareas.map(tarea =>
            tarea.id === tareaId ? { ...tarea, completada: e.target.checked } : tarea
        );
        createHtml();
    }
}

function eliminartarea(e) {
    if (e.target.tagName === "SPAN") {
        const eliminarId = parseInt(e.target.getAttribute("tarea-id"));
        tareas = tareas.filter(tarea => tarea.id !== eliminarId);
        createHtml();
        alert("Tarea eliminada");
    }
}

function eliminartodo() {
    tareas = [];
    createHtml();
    alert("Todas las tareas han sido eliminadas");
}

function agregartarea() {
    const tareaTexto = input.value.trim();
    if (tareaTexto === "") {
        showerror("Campo vacío");
        return;
    }
    const tareaObj = {
        tarea: tareaTexto,
        id: Date.now(),
        completada: false
    }
    tareas = [...tareas, tareaObj];
    createHtml();
    input.value = "";
}

function createHtml() {
    clearhtml();
    if (tareas.length > 0) {
        tareas.forEach(tarea => {
            const li = document.createElement("li");
            li.setAttribute("tarea-id", tarea.id);

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("tarea-id", tarea.id);
            checkbox.checked = tarea.completada;

            const texto = document.createElement("span");
            texto.textContent = tarea.tarea;
            if (tarea.completada) {
                texto.classList.add("completada");
            }

            const eliminar = document.createElement("span");
            eliminar.textContent = "X";
            eliminar.setAttribute("tarea-id", tarea.id);
            eliminar.classList.add("eliminar");

            li.appendChild(checkbox);
            li.appendChild(texto);
            li.appendChild(eliminar);
            listaTareas.appendChild(li);
        });
    }
    sincronizarStorage();
    actualizarContador();
}

function sincronizarStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function showerror(error) {
    const messageError = document.createElement("p");
    messageError.textContent = error;
    messageError.classList.add("error");

    message.appendChild(messageError);
    setTimeout(() => {
        messageError.remove();
    }, 2000);
}

function clearhtml() {
    listaTareas.innerHTML = "";
}

function actualizarContador() {
    const completas = tareas.filter(t => t.completada).length;
    const incompletas = tareas.length - completas;
    contador.textContent = `Completas: ${completas} | Incompletas: ${incompletas}`;
}

function cerrarsesion() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Inicializar eventos
eventolistado();