const typeNewTask = document.getElementById("typeNewTask");
const addTaskButtonElement = document.getElementById("addTaskButton");
const completedTasksElement = document.getElementById("completedTasks");
const taskElement = document.getElementById("taskList");

let tasks = []; //array for new added tasks
let completedTasks = []; //array for completed tasks

//function that adds tasks by clicking a button
//in correspondance with HTML
function addTask() {
  addTaskButtonElement.addEventListener("click", addTaskHandler);
}

// function that adds a new task
function addTaskHandler() {
  if (typeNewTask.value.length > 0) {
    //checks whether value is inputted in text field
    const newTask = typeNewTask.value;
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

    taskElement.appendChild(taskItemElement); //adds the individual task to the taskList

    typeNewTask.value = ""; //sets value to empty string to clear text field
  }
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
    const completedTaskElement = document.createElement("li");
    completedTaskElement.innerText = taskName;

    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.innerText = "❌";
    deleteButtonElement.addEventListener("click", deleteCompletedTaskHandler); //adds the new element

    completedTaskElement.appendChild(deleteButtonElement);
    completedTasksElement.appendChild(completedTaskElement);
    taskItem.remove(); //removes the task item from the page (work in progress)
    updateTasks();
  }
}

// function to delete a task
function deleteTaskHandler(event) {
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
    const taskItem = event.target.parentNode;
    const taskName = taskItem.querySelector("li").innerText;
    completedTasks = completedTasks.filter((task) => task !== taskName); // remove task from completedTasks array
    taskItem.remove();
    updateTasks();
}

// function to update the task list and completed task list
function updateTasks() {
  completedTasksElement.innerHTML = "";
  completedTasks.forEach((task) => {
    //clears the current HTML element content
    //and loops it through the completedTasks array
    const completedTaskElement = document.createElement("li");
    completedTaskElement.innerText = task;

    const deleteButtonElement = document.createElement("button");
    deleteButtonElement.innerText = "❌";
    deleteButtonElement.addEventListener("click", deleteCompletedTaskHandler);//adds the new element

    completedTaskElement.appendChild(deleteButtonElement);
    completedTasksElement.appendChild(completedTaskElement);
  });
}

addTask();
