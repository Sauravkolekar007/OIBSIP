let display = document.getElementById("display");

function press(val){
  display.value += val;
}

function calculate(){
  try{
    display.value = eval(display.value);
  }catch{
    alert("Invalid Expression");
  }
}

function allClear(){
  display.value="";
}

function backspace(){
  display.value = display.value.slice(0,-1);
}
