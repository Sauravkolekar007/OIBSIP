let taskList = document.getElementById("taskList");

window.onload = function(){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => renderTask(t));
}

function addTask(){
  let title = document.getElementById("title").value.trim();
  let desc = document.getElementById("desc").value.trim();

  if(title=="" || desc==""){
    alert("Fill all fields");
    return;
  }

  let task = {title,desc,done:false};
  saveTask(task);
  renderTask(task);

  document.getElementById("title").value="";
  document.getElementById("desc").value="";
}

function renderTask(task){
  let div = document.createElement("div");
  div.className="task-card";

  if(task.done) div.classList.add("completed");

  div.innerHTML=`
    <h4>${task.title}</h4>
    <p>${task.desc}</p>
    <div class="task-actions">
      <button class="delete">X</button>
    </div>
  `;

  div.onclick=function(){
    div.classList.toggle("completed");
    toggleTask(task.title);
  }

  div.querySelector(".delete").onclick=function(e){
    e.stopPropagation();
    removeTask(task.title);
    div.remove();
  }

  taskList.appendChild(div);
}

function saveTask(task){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function toggleTask(title){
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.map(t=>{
    if(t.title==title) t.done=!t.done;
    return t;
  });
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function removeTask(title){
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter(t=>t.title!==title);
  localStorage.setItem("tasks",JSON.stringify(tasks));
}
