const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];
let filter = "all";

addBtn.addEventListener("click", () => {

    if(taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        date: dateInput.value,
        completed: false
    });

    taskInput.value = "";
    dateInput.value = "";

    renderTasks();
});

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(filter === "pending")
            return !task.completed;

        if(filter === "complete")
            return task.completed;

        return true;
    });

    filteredTasks.forEach((task,index) => {

        const li = document.createElement("li");

        li.innerHTML = `
        <div class="left">
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <div class="task-info">
                <h4 style="text-decoration:${task.completed ? "line-through":"none"}">
                    ${task.text}
                </h4>
                <p>${task.date}</p>
            </div>
        </div>

        <div class="right">
            <span class="status">
                ${task.completed ? "Complete":"Pending"}
            </span>

            <button class="edit">✏️</button>
            <button class="delete">🗑️</button>
        </div>
        `;

        const checkbox = li.querySelector("input");
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const deleteBtn = li.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {

            const originalIndex = tasks.indexOf(task);
            tasks.splice(originalIndex,1);

            renderTasks();
        });

        const editBtn = li.querySelector(".edit");
        editBtn.addEventListener("click", () => {

            let newTask = prompt("Edit Task", task.text);

            if(newTask){
                task.text = newTask;
                renderTasks();
            }
        });

        taskList.appendChild(li);
    });

    updateCounts();
}

function updateCounts() {

    let total = tasks.length;

    let completed = tasks.filter(
        task => task.completed
    ).length;

    let pending = total - completed;

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("pending").textContent = pending;
}

document.querySelectorAll(".filter").forEach(btn => {

    btn.addEventListener("click", () => {

        filter = btn.dataset.filter;

        renderTasks();
    });

});

renderTasks();