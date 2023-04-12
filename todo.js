window.addEventListener("load", function () {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
  updateTasks();
});

const typeNewTask = document.getElementById("typeNewTask");
const addTaskButtonElement = document.getElementById("addTaskButton");
const completedTasksElement = document.getElementById("completedTasks");
const taskElement = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //array for new added tasks - chatgpt suggestion
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || []; //array for completed tasks

//function for localstorage
function updateLocalStorage(tasks, completedTasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }

//function that adds tasks by clicking a button
//in correspondance with HTML
function addTask() {
  addTaskButtonElement.addEventListener("click", addTaskHandler);
  updateTasks();
}

// function that adds a new task
function addTaskHandler() {
  if (typeNewTask.value.length > 0) {
    //checks whether value is inputted in text field
    const newTask = typeNewTask.value;
    tasks.push(newTask); //adds newTask to tasks array

    updateLocalStorage(tasks, completedTasks);

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

    taskElement.appendChild(taskItemElement); //adds the individual task to the taskList
    console.log(taskItemElement);

    typeNewTask.value = ""; //sets value to empty string to clear text field
  }
  updateTasks();
}

// function to complete a task
function completeTaskHandler(event) {
  //event as argument
  const taskItem = event.target.parentNode;
  const taskName = taskItem.querySelector("li").innerText;
  const taskIndex = tasks.indexOf(taskName);
  if (taskIndex > -1) {
    //task already exists
    tasks.splice(taskIndex, 1); //splices a single task from tasks array
    completedTasks.push(taskName); // add completed task to completedTasks array

    updateLocalStorage(tasks, completedTasks);

    const completedTaskElement = document.createElement("li");
    completedTaskElement.innerText = taskName;
    completedTaskElement.dataset.taskName = taskName; //chatgpt suggested this solution

    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.innerText = "❌";
    deleteButtonElement.addEventListener("click", deleteCompletedTaskHandler); //adds the new element

    completedTaskElement.appendChild(deleteButtonElement);
    completedTasksElement.appendChild(completedTaskElement);
    taskItem.remove(); //removes the task item from the page (work in progress)
  }
  updateTasks();
}

// function to delete a task
function deleteTaskHandler(event) {
  updateLocalStorage(tasks);

  const taskItem = event.target.parentNode; //becomes parent of button element
  const taskName = taskItem.querySelector("li").innerText;
  //strict inequality operator to determine if task should be removed
  //based on the taskName variable. lines 69-70 adapted from chatgpt
  //and i had a lot of trouble figuring out how to do this
  tasks = tasks.filter((task) => task !== taskName); //filter removes taskName from tasks array
  completedTasks = completedTasks.filter((task) => task !== taskName); // remove task from completedTasks array
  taskItem.remove();
  updateTasks();
}

//function to delete a task from completed task list
function deleteCompletedTaskHandler(event) {
  updateLocalStorage(tasks, completedTasks);

  const taskItem = event.target.parentNode;
  const taskName = taskItem.dataset.taskName;
  completedTasks = completedTasks.filter((task) => task !== taskName); // remove task from completedTasks array
  const completedTaskElement = taskItem.parentNode;
  completedTaskElement.removeChild(taskItem);
  taskItem.remove();
  updateTasks();
}

// function to update the task list and completed task list
function updateTasks() {
  updateLocalStorage(tasks, completedTasks);

  taskElement.innerHTML = "";
  tasks.forEach((task) => {
    const taskItemElement = document.createElement("div");
    taskItemElement.classList.add("taskItem");
    const taskNameElement = document.createElement("li");
    taskNameElement.innerText = task;

    const completeButtonElement = document.createElement("button");
    completeButtonElement.innerText = "✔️";
    completeButtonElement.addEventListener("click", completeTaskHandler);

    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.innerText = "❌";
    deleteButtonElement.addEventListener("click", deleteTaskHandler);

    taskItemElement.appendChild(taskNameElement);
    taskItemElement.appendChild(completeButtonElement);
    taskItemElement.appendChild(deleteButtonElement);

    taskElement.appendChild(taskItemElement);
  });

  completedTasksElement.innerHTML = "";
  completedTasks.forEach((task) => {
    //clears the current HTML element content
    //and loops it through the completedTasks array
    const completedTaskElement = document.createElement("li");
    completedTaskElement.innerText = task;

    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.innerText = "❌";
    deleteButtonElement.addEventListener("click", deleteCompletedTaskHandler); //adds the new element

    completedTaskElement.appendChild(deleteButtonElement);
    completedTasksElement.appendChild(completedTaskElement);
  });
}

addTask();
updateTasks();
