let taskList = document.getElementById("taskList");

window.onload = function(){
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.done));
}

function addTask(){
  let taskInput = document.getElementById("taskInput");
  let task = taskInput.value.trim();

  if(task === ""){
    alert("Please enter a task");
    return;
  }

  addTaskToDOM(task, false);
  saveTask(task, false);
  taskInput.value = "";
}

function addTaskToDOM(task, done){
  let li = document.createElement("li");
  li.innerText = task;

  if(done){
    li.classList.add("completed");
  }

  li.onclick = function(){
    li.classList.toggle("completed");
    updateTaskStatus(task);
  }

  let delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.className = "delete-btn";

  delBtn.onclick = function(e){
    e.stopPropagation();
    removeTask(task);
    li.remove();
  }

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(task, done){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({text: task, done: done});
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(task){
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.map(t => {
    if(t.text === task){
      t.done = !t.done;
    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
