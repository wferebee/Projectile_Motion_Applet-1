var context;
var canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d');
var startTime, endTime;

var myRectangle ={
    x: 0,
    y: canvas.height,
    yi: canvas.height,
    radius: 2,
    v: 24.2,
    theta: 45* Math.PI/180
}

function draw () {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    timeDiff /= 50;
    var s = Math.round(timeDiff);
    myRectangle.y = myRectangle.yi - (myRectangle.v*(s)*(Math.sin(myRectangle.theta))) +(.98*Math.pow(s, 2));
    myRectangle.x = (myRectangle.v*(s))*Math.cos(myRectangle.theta);
    context.clearRect(0,0, window.innerWidth,window.innerHeight);
    context.beginPath();
    context.arc(myRectangle.x, myRectangle.y, myRectangle.radius, 0, 2*Math.PI, true);
    context.fillStyle= "green";
    context.fill();
}

function start() {
    startTime = new Date();
  };

document.getElementById("mybtn").addEventListener("click", animate);

function animate() {
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    start();
    //start = {};
    setInterval(draw, 50);
    //.log(window.innerWidth)
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  myRectangle.theta = this.value * (Math.PI/180);
  //console.log(slider.value);
  //console.log("this is theta: " + myRectangle.theta)
}

var sliderPower = document.getElementById("myPower");
var outputPower = document.getElementById("demoPower");
outputPower.innerHTML = sliderPower.value;

sliderPower.oninput = function() {
  outputPower.innerHTML = this.value;
  //myRectangle.v = this.value/(4.132231404);
  //myRectangle.v = this.value / 4.132
  // myRectangle.v = this.value / Math.pow(3, 2) + 13; // need to fix this equation* * Fixed this equation on the one below.
  // plugged in the coordinates (0,0),(25,11.1),(50,16.9),(75,19.9),(100,24.2) into a graph to find a line of best fit.
  // using cubic regression, I found the below equation to giv me the values i wanted from associated power levels on the slider.

  myRectangle.v = (0.0000352 * Math.pow((this.value), 3)) + (-0.00715429 * Math.pow((this.value), 2)) + (0.605429 * (this.value)) + (-0.0228571);  
  //console.log(sliderPower.value);
  //console.log("this is Power: " + myRectangle.v)
}




