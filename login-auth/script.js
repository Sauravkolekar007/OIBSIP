// REGISTER
function register(){
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let user = document.getElementById("regUser").value.trim();
  let pass = document.getElementById("regPass").value.trim();

  if(name=="" || email=="" || user=="" || pass==""){
    alert("All fields required");
    return;
  }

  if(localStorage.getItem(user)){
    alert("User already exists");
    return;
  }

  let userData = {
    name:name,
    email:email,
    password:pass
  };

  localStorage.setItem(user, JSON.stringify(userData));
  alert("Registration Successful");
  window.location.href="login.html";
}

// LOGIN
function login(){
  let user = document.getElementById("logUser").value.trim();
  let pass = document.getElementById("logPass").value.trim();
  let remember = document.getElementById("remember").checked;

  let stored = localStorage.getItem(user);

  if(!stored){
    document.getElementById("msg").innerText="User not found";
    return;
  }

  let data = JSON.parse(stored);

  if(data.password===pass){

    if(remember){
      localStorage.setItem("rememberUser",user);
    }

    localStorage.setItem("activeUser",user);
    window.location.href="dashboard.html";
  }
  else{
    document.getElementById("msg").innerText="Wrong password";
  }
}

// SHOW/HIDE PASSWORD
function toggleReg(){
  let x=document.getElementById("regPass");
  x.type = x.type==="password"?"text":"password";
}

function toggleLog(){
  let x=document.getElementById("logPass");
  x.type = x.type==="password"?"text":"password";
}

// REMEMBER USER
window.onload=function(){
  let saved=localStorage.getItem("rememberUser");
  if(saved && document.getElementById("logUser")){
    document.getElementById("logUser").value=saved;
  }
}

// FORGOT PASSWORD
function forgot(){
  let user=prompt("Enter your username");

  let stored=localStorage.getItem(user);

  if(!stored){
    alert("User not found");
    return;
  }

  let data=JSON.parse(stored);
  alert("Your password is: "+data.password);
}
