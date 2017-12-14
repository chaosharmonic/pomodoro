
var work = 25;
var rest = 5;
var sec = 0;
var counting = false;
var loop = false;
var state = "work";
var timer = null;


function countdown(min){
  var clock = min + ":" + "00"
  counting = true;
  timer = setInterval(function(){
    if (!(min == 0 && sec == 0)){
      if (sec == 0){
        min--;
        sec = 59
        clock = min + ":" + sec
      }
      else if (sec < 11){
        sec--;
        secDisplay = "0" + sec;
        clock = min + ":" + secDisplay;
      }
      else {
        sec--;
        clock = min + ":" + sec
      }
      if (state == "work"){
        work = min;
      }
      else {
        rest = min;
      }
      clockDisplay.textContent = clock;
    }
    else {
      clearInterval(timer);
      if (state == "work"){
        state == "rest"
        clockLabel.textContent = "Break time!";
        countdown(rest);
      }
      else {
        state == "work";
        if (loop){
          clockLabel.textContent = "Back to work!";
          countdown(work);
        }
        else {
          clockLabel.textContent = "";
          counting = false;
        }
      }
    }
  }, 1000);
}

var workDisplay = document.querySelector("#workDisplay");
var restDisplay = document.querySelector("#restDisplay");
var clockDisplay = document.querySelector("#clockDisplay");
var clockLabel = document.querySelector("#clockLabel");

var restPlus = document.querySelector("#restPlus");
var restMinus = document.querySelector("#restMinus");
var workPlus = document.querySelector("#workPlus");
var workMinus = document.querySelector("#workMinus");

var start = document.querySelector("#start");
var resetButton = document.querySelector("#reset");
var loopButton = document.querySelector("#loop");


function workMod(num) {
  if (state == "work" || !counting){
    work += num;
    workDisplay.textContent = work;
    if (state == "work" && !counting){
      clockDisplay.textContent = work + ":00";
    }
  }
}

function restMod(num) {

  if (state == "rest" || !counting){
    rest += num;
    restDisplay.textContent = rest;
    if (state == "rest"){
      clockDisplay.textContent = rest + ":00";
    }
  }
}

function reset() {
  work = 25;
  rest = 5;
  sec = 0;
  var counting = false;
  var loop = false;
  var state = "work";
  workDisplay.textContent = work;
  restDisplay.textContent = rest;
  clockDisplay.textContent = work + ":00";
  clockLabel.textContent = "";
}

restPlus.addEventListener("click", function(){
  restMod(1);
});
restMinus.addEventListener("click", function(){
  if (rest > 0) {
    restMod(-1);
  }
});

workPlus.addEventListener("click", function(){
  workMod(1);
});
workMinus.addEventListener("click", function(){
  if (work > 0) {
    workMod(-1);
  }
});

resetButton.addEventListener("click", function(){
  reset();
});

start.addEventListener("click", function(){
  if (!counting){
    start.textContent = "Pause";
    if (state == "work"){
      countdown(work);
    }
    else{
      countdown(rest);
    }
  }
  else {
    counting = false;
    clearInterval(timer);
    start.textContent = "Start";
  }
});

loopButton.addEventListener("click", function(){
  if (!loop){
    loopButton.textContent = "Repeat: On";
    loop = true;
  }
  else {
    loopButton.textContent = "Repeat: Off";
    loop = false;
  }
});


reset();
