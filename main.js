document.addEventListener('DOMContentLoaded', () => {
    console.log('Ya he cargado el DOM');

    let input = document.querySelector('.input');

    input.addEventListener('keyup', event => {
        input.placeholder = "Add task...";
        input.classList.remove("inputError");

        if (event.keyCode === 13) {
            let listaTareas = document.querySelector('.todo :nth-child(2)');

            let nombreTarea = event.target.value;

            if (nombreTarea === "") {
                if (input.classList[input.classList.item - 1] !== "inputError") {
                    input.classList.add("inputError");
                }

                input.placeholder = "The taskname can't be empty!";
            } else {
                let task = createTask(nombreTarea);

                listaTareas.appendChild(task);

                //Evento DRAG
                if (task.parentElement.className === 'tasksList') {
                    task.setAttribute("draggable", false);
                    task.addEventListener("dragstart", event => {
                        drag(event);
                    })
                }

                event.target.value = "";
            }
        }
    });

    //Evento para la ventana modal
    let modal = document.querySelector(".ventanaDetalleOut");

    modal.addEventListener("click", event => {
        if (event.target.className === "ventanaDetalleOut") {
            modal.style.display = "none";
        }
    });
});

const createTask = (taskName) => {
    const taskId = new Date().getTime();

    const taskObj = new Task(taskId, taskName, new Date().toGMTString());

    let task = document.createElement("a");
    task.classList.add('task');
    task.setAttribute("id", taskId);
    task.setAttribute("href", `#${taskId}`);

    //Eliminamos el evento click de la tarea para permitir el drag
    task.addEventListener("click", event => {
        event.preventDefault();
    });

    //Evento para ventana modal

    task.addEventListener("dblclick", event => {
        let ventanaDetalle = document.querySelector(".ventanaDetalleOut");

        ventanaDetalle.style.display = "block";

        let vdTitle = document.querySelector("#taskDetailTitle");
        let vdCloseButton = document.querySelector("#vdClose");
        let vdFechaCreacion = document.querySelector("#fechaCreacion");

        //Rellenamos los datos de la ventana Detalle
        vdTitle.innerText = taskObj.getName();
        vdFechaCreacion.innerText = "Creation date: " + taskObj.getFechaCreacion();

        console.log(taskObj);

        //Evento para cerrar el modal
        vdCloseButton.addEventListener("click", event => {
            ventanaDetalle.style.display = "none";
        });

        //Evento para editar el titulo
        let taskNameTemp;

        vdTitle.setAttribute("contentEditable", true);

        vdTitle.addEventListener("focus", event => {
            taskNameTemp = event.target.innerText;
        });

        vdTitle.addEventListener("blur", event => {
            if (event.target.innerText === "") {
                event.target.innerText = taskNameTemp;
            } else {
                taskObj.setName(event.target.innerText);
                title.innerText = taskObj.getName();
            }
        });

        vdTitle.addEventListener("keydown", event => {
            if (event.keyCode === 13) {
                event.target.blur();
            }
        });
    });

    //Evento para la asignación de miembros

    task.onmouseover = event => {
        event.target.onkeydown = event => {
            if (event.keyCode === 32) {

                let miembro = document.createElement('img');
                miembro.src = "./img/miembro.png";

                miembro.classList.add("miembro-icon");

                if (typeof buttoner.childNodes[2] === 'undefined') {
                    buttoner.appendChild(miembro);
                } else {
                    buttoner.childNodes[2].remove();
                }
            }
        }
    }

    // Evento para asignar miembros
    // task.addEventListener("dblclick", event => {
    //     //Si la clase de la tarea es task asignamos el miembro
    //     if (event.target.parentNode.className === 'task') {
    //         let miembro = document.createElement('img');
    //         miembro.src = "./img/miembro.png";

    //         miembro.classList.add("miembro-icon");

    //         if (typeof buttoner.childNodes[2] === 'undefined') {
    //             buttoner.appendChild(miembro);
    //         } else {
    //             buttoner.childNodes[2].remove();
    //         }
    //     }
    // });

    //Titulo de la tarea
    let title = document.createElement("h3");
    title.innerText = `${taskName}`;
    title.setAttribute("contentEditable", true);

    let taskNameTemp;

    title.addEventListener("focus", event => {
        taskNameTemp = event.target.innerText;
    });

    title.addEventListener("blur", event => {
        if (event.target.innerText === "") {
            event.target.innerText = taskNameTemp;
        } else {
            taskObj.setName(event.target.innerText);
            title.innerText = taskObj.getName();
        }
    });

    title.addEventListener("keydown", event => {
        if (event.keyCode === 13) {
            event.target.blur();
        }
    });

    task.appendChild(title);

    //Creamos el div botonera
    let buttoner = document.createElement("div");
    buttoner.classList.toggle("buttoner");

    //Boton de completar
    let completeButton = document.createElement("button");
    completeButton.innerText = "✔️";
    completeButton.addEventListener("click", event => {


        if (completeButton.innerText === "✔️") {
            completeButton.innerText = "❌"

            //Si la clase del padre de la tarea es otra tarea la pintamos de verde sino a done
            if (event.target.parentNode.parentNode.parentNode.className === 'subTasks') {
                task.classList.toggle("taskCompleted");
            } else {
                let doing = document.querySelector('.done :nth-child(2)');

                doing.appendChild(task);
            }
        } else {
            completeButton.innerText = "✔️"

            //Si la clase del padre de la tarea es otra tarea la pintamos de verde sino a done
            if (event.target.parentNode.parentNode.parentNode.className === 'subTasks') {
                task.classList.toggle("taskCompleted");
            } else {
                let doing = document.querySelector('.toDo :nth-child(2)');

                doing.appendChild(task);
            }
        }
    })

    //Boton de eliminar
    let removeButton = document.createElement("button");
    removeButton.innerText = "🗑️";
    removeButton.addEventListener('click', event => {
        task.remove();
    });

    // buttoner.appendChild(completeButton);
    // buttoner.appendChild(removeButton);

    // //Subtareas
    // let subTasks = document.createElement("div");
    // subTasks.classList.add("subTasks");

    // let subInput = document.createElement('input');
    // subInput.placeholder = "Add subtask...";
    // subInput.name = "subTask";
    // subInput.classList.add("inputSubTask");

    // subInput.addEventListener("keyup", event => {
    //     if (event.keyCode === 13) {
    //         let subTask = createTask(subInput.value);

    //         subTask.classList.add("subTask");

    //         event.target.parentNode.appendChild(subTask);

    //         subInput.value = "";
    //     }
    // });

    // subTasks.appendChild(subInput);
    // task.appendChild(subTasks);
    task.appendChild(buttoner);
    return task;
}

class Task {
    constructor(id, name, fechaCreacion) {
        this.id = id;
        this.name = name;
        this.fechaCreacion = fechaCreacion;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getFechaCreacion() {
        return this.fechaCreacion;
    }
}

const changeBackground = (picker) => {
    let color = picker.toRGBString();

    document.body.style.backgroundColor = color;
    document.querySelector(".menuBar").style.backgroundColor = color;

    console.log(color);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    if (ev.target.parentNode.className === "tasksList") {
        ev.dataTransfer.setData("id", ev.target.id);
    }
}

function drop(ev) {
    console.log(ev.dataTransfer);


    //Comprobamos que target ha recibido el evento de drop
    if (ev.target.className === "tasksList") {
        ev.preventDefault();

        var data = ev.dataTransfer.getData("id");

        //Comprobamos si el id es !null por si es una subtarea
        if (document.getElementById(data) !== null) {
            let objToDrop = document.getElementById(data);
            ev.target.appendChild(objToDrop);
        }
    }
}