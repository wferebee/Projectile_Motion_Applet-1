var canvas, context, button, startTime, endTime, slider, sliderPower, output, outputPower;

canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d');

button = document.getElementById("mybtn");
button.addEventListener("click", animate)

angleSlider = document.getElementById("myRange");
angleSlider.oninput = captureAngleSliderInput;

angleOutput = document.getElementById("demo");
angleOutput.innerHTML = angleSlider.value;

powerSlider = document.getElementById("myPower");
powerSlider.oninput = capturePowerSliderInput;

powerOutput = document.getElementById("demoPower");
powerOutput.innerHTML = powerSlider.value;

var myRectangle = {
    x: 0,
    y: canvas.height,
    yi: canvas.height,
    radius: 2,
    v: 24.2,
    theta: 45* Math.PI/180
}

function draw () {
    endTime = new Date();
    var timeDiff = (endTime - startTime) / 50; //in ms
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

function animate() {
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    start();
    setInterval(draw, 50);
}

function captureAngleSliderInput(){
  output.innerHTML = this.value;
  myRectangle.theta = this.value * (Math.PI/180);
}

function capturePowerSliderInput(){
 outputPower.innerHTML = this.value;
  myRectangle.v = (0.0000352 * Math.pow((this.value), 3)) + (-0.00715429 * Math.pow((this.value), 2)) + (0.605429 * (this.value)) + (-0.0228571); 
}

  // Ideally when the angle is set to 90 degrees, and the power level is set to 100%, the projectile should just ouch the top of the rectangle.
  //    And when the angle is set to 45 degrees with a power level of 100%, the projetile should just otuch the far bottom corner of the rectangle. 
  //    To do this, I had to play around with the values, but that didnt yield great results.

  // Early Attempts at getting the powerlevel and angle right -
  // myRectangle.v = this.value/(4.132231404);
  // myRectangle.v = this.value / 4.132;
  // myRectangle.v = this.value / Math.pow(3, 2) + 13;

  // SOLVE -
  // I plugged in the coordinates shown below into a graph in order to find a line of best fit, and using cubic regression,
  // I came up with this equation which gave the best values for the associated angles and power levels I desired.
  //        (0,0),(25,11.1),(50,16.9),(75,19.9),(100,24.2) 





