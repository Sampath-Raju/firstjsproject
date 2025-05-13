document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task === "") return;

  createTaskElement(task);
  saveTask(task);
  taskInput.value = "";
}

function createTaskElement(task, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = task;
  span.onclick = () => {
    li.classList.toggle("completed");
    toggleComplete(task);
  };

  const btn = document.createElement("button");
  btn.textContent = "❌";
  btn.onclick = () => {
    li.remove();
    deleteTask(task);
  };

  li.appendChild(span);
  li.appendChild(btn);
  document.getElementById("taskList").appendChild(li);
}

// Local Storage Functions
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskToDelete) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(({ task }) => task !== taskToDelete);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleComplete(taskToToggle) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(t => {
    if (t.task === taskToToggle) t.completed = !t.completed;
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ task, completed }) => {
    createTaskElement(task, completed);
  });
}
