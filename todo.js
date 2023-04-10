const typeNewTask = document.getElementById("typeNewText");
const addTaskButtonElement = document.getElementById("addTaskButton");
const completedTasksElement = document.getElementById("completedTasks");
const taskElement = document.getElementById("taskList");

let tasks = [];

function addTask() {
  addTaskButtonElement.addEventListener("click", addTaskHandler);
}

function addTaskHandler() {
    if (inputElement.value.length > 0) { //checks whether value is inputted in text field
      const newTask = inputElement.value;
      tasks.push(newTask); //adds newTask to tasks array
  
      const taskItemElement = document.createElement("div");
      taskItemElement.classList.add("taskItem");
      const taskNameElement = document.createElement("li");
      taskNameElement.innerText = newTask;
  
      const completeButtonElement = document.createElement("button");
      completeButtonElement.innerText = "✔️";
      completeButtonElement.addEventListener("click", completeTaskHandler); //when button is clicked, event happens
  
      const deleteButtonElement = document.createElement("button");
      deleteButtonElement.innerText = "❌";
      deleteButtonElement.addEventListener("click", deleteTaskHandler);
  
      taskItemElement.appendChild(taskNameElement);
      taskItemElement.appendChild(completeButtonElement);
      taskItemElement.appendChild(deleteButtonElement);
  
      taskListElement.appendChild(taskItemElement);
  
      inputElement.value = ""; //sets value to empty string to clear text field
    }
  }
  
  // function to complete a task
  function completeTaskHandler() {
    const taskName = taskItem.querySelector("li").innerText;
  }
  
  // function to delete a task
  function deleteTaskHandler() { //event as argument
    taskItem.remove();
    updateTasks();
  }
  
  // function to update the task list and completed task list
  function updateTasks() {
    completedTasksElement.innerHTML = "";
  }
  
  addTask();