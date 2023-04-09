const typeNewTask = document.getElementById("typeNewText");
const addTaskButtonElement = document.getElementById("addTaskButton");
const completedTasksElement = document.getElementById("completedTasks");
const taskElement = document.getElementById("taskList");

let tasks = [];

function addTask() {
  addTaskButtonElement.addEventListener("click", addTaskHandler);
}