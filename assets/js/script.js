const cuerpo = document.getElementById("cuerpo")
const botonAdd = document.getElementById("botonAgregar")
const botonDel = document.getElementsByClassName("botonEliminar")
const botonCam = document.getElementsByClassName("botonCambiar")
let tarea = document.getElementById("inputTarea")
let listaHTML = document.getElementById("listaTareas")
let contador_total = document.getElementById("contTotal")
let contador_realizada = document.getElementById("contRealizada")
let ct = 0
let cr = 0
let addHTML = ""
let listadoTareas = [{
    id: 1, 
    descripcion: 'Arregla mueble',
    completado: false
},
{
    id: 2, 
    descripcion: 'Estudiar arreglos javascript',
    completado: false
},
{
    id: 3, 
    descripcion: 'Pintar',
    completado: false
}]
let id_tarea = listadoTareas.length > 0 ? Math.max(...listadoTareas.map(t => t.id)) + 1 : 1;

cuerpo.addEventListener("load", cargar());
botonAdd.addEventListener('click', function(){
    if(tarea.value != ''){
        listadoTareas.push({
            id: id_tarea++,
            descripcion: tarea.value,
            completado: false
        });
        tarea.value = ''
        cargarNuevaTarea()
    }
    else{
        alert("No se ingresarán tareas vacías")
    }
});

function cargarNuevaTarea(){
    listaHTML.innerHTML = ''
    contador_total.innerHTML = 0
    ct = 0
    addHTML = ''
    for(let tar of listadoTareas){
        addHTML+=
        `   
            <tr id="row_${tar.id}">
                <td>
                    ${tar.id}
                </td>
                <td>
                    ${tar.descripcion}
                </td>
                <td>
                    <input class="form-check-input botonCambiar" type="checkbox" id="tarea${tar.id}" ${tar.completado ? 'checked' : ''}>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm botonEliminar" id="elimTarea${tar.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `
        ct++
    }
    listaHTML.innerHTML = addHTML
    contador_total.innerHTML = ct

    agregarListeners()
}

function completarTarea(id){
    const tareaId = parseInt(id.replace('tarea', ''))
    const tarea = listadoTareas.find(t => t.id === tareaId)
    const fila = document.getElementById(`row_${tareaId}`)
    if(tarea){
        tarea.completado = !tarea.completado
        if (tarea.completado) {
            fila.classList.add("table-success")
            cr++;
        } else {
            fila.classList.remove("table-success")
            cr--;
        }
        contador_realizada.innerHTML = cr
    }
}

function eliminarTarea(id){
    const tareaId = parseInt(id.replace('elimTarea', ''))
    listadoTareas = listadoTareas.filter(t => t.id !== tareaId)
    cargarNuevaTarea()
}

function cargar(){
    cargarNuevaTarea()
}

function agregarListeners(){
    const checkboxes = document.querySelectorAll(".botonCambiar")
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(){
            completarTarea(checkbox.id)
        })
    })

    const botonesEliminar = document.querySelectorAll(".botonEliminar")
    botonesEliminar.forEach(boton=> {
        boton.addEventListener('click', function(){
            eliminarTarea(boton.id)
        })
    })
}