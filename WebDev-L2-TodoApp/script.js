const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// Local Storage se tasks lena
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
addBtn.addEventListener("click", function () {

    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskValue,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

});

// Enter key se task add karna
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addBtn.click();
    }

});

// Save Tasks
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}

// Display Tasks
function displayTasks() {

    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    const pending = tasks.filter(function (task) {
        return task.completed === false;
    });

    const completed = tasks.filter(function (task) {
        return task.completed === true;
    });

    // Pending Tasks Display
    if (pending.length === 0) {

        pendingTasks.innerHTML =
            '<p class="empty-message">No pending tasks found.</p>';

    } else {

        pending.forEach(function (task) {

            createTaskElement(task, pendingTasks);

        });

    }

    // Completed Tasks Display
    if (completed.length === 0) {

        completedTasks.innerHTML =
            '<p class="empty-message">No completed tasks found.</p>';

    } else {

        completed.forEach(function (task) {

            createTaskElement(task, completedTasks);

        });

    }

    // Update Counts
    totalCount.textContent = tasks.length;
    pendingCount.textContent = pending.length;
    completedCount.textContent = completed.length;

}

// Create Task Element
function createTaskElement(task, container) {

    const taskItem = document.createElement("div");

    taskItem.className = "task-item";

    if (task.completed) {
        taskItem.classList.add("completed");
    }

    const taskText = document.createElement("span");

    taskText.className = "task-text";
    taskText.textContent = task.text;

    const actions = document.createElement("div");

    actions.className = "task-actions";

    // Complete Button
    const completeBtn = document.createElement("button");

    completeBtn.className = "complete-btn";

    completeBtn.textContent = task.completed ? "Undo" : "Complete";

    completeBtn.addEventListener("click", function () {

        toggleTask(task.id);

    });

    // Edit Button
    const editBtn = document.createElement("button");

    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function () {

        editTask(task.id);

    });

    // Delete Button
    const deleteBtn = document.createElement("button");

    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {

        deleteTask(task.id);

    });

    actions.append(completeBtn, editBtn, deleteBtn);

    taskItem.append(taskText, actions);

    container.appendChild(taskItem);

}

// Complete / Undo Task
function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });

    saveTasks();

}

// Edit Task
function editTask(id) {

    const task = tasks.find(function (task) {
        return task.id === id;
    });

    const updatedText = prompt("Edit your task:", task.text);

    if (updatedText === null) {
        return;
    }

    if (updatedText.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    tasks = tasks.map(function (item) {

        if (item.id === id) {

            return {
                ...item,
                text: updatedText.trim()
            };

        }

        return item;

    });

    saveTasks();

}

// Delete Task
function deleteTask(id) {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) {
        return;
    }

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });

    saveTasks();

}

// Initial Display
displayTasks();