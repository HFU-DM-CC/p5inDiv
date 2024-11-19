/**
 * This script illustrates how to create multiple p5 canvases in divs
 */

// get the main div
const mainDiv = document.getElementById("main");

// create empty arrays to store divs and p5 instances for later access
let myDivs = [];
let myP5s = [];

// create 9 divs with p5 instances
for (let i = 0; i < 9; i++) {
  const newDiv = document.createElement("div"); // create a new div
  newDiv.id = "p5canvas" + i; // set the id of the div to p5canvas0, p5canvas1, ...
  myDivs.push(newDiv); // store each div in the array

  // create a new p5 instance including the setup and draw functions
  let sketch = function (p) {
    // here you can put your p5 code that shall be executed in the div
    // Note that you have to use "p." to access the p5 functions
    let x = 10;
    let y = 10;

    p.setup = function () {
      p.createCanvas(160, 160);
      p.fill(255, 255, 0);
      p.stroke(0);
      p.strokeWeight(10);
    };

    p.draw = function () {
      p.background(90);
      p.rect(x, y, 35, 45);
    };

    // change the stroke to a random rgb color
    p.changeStrokeColor = function () {
      p.stroke(p.random(255), p.random(255), p.random(255));
    };

    // here you can put your own functions that you want to call from outside
  };

  // create a new p5 instance using the sketch variable that containes the setup and draw functions
  let myp5 = new p5(sketch, newDiv);
  // store each p5 instance in the array
  myP5s.push(myp5);
  // append each div to the main div
  mainDiv.appendChild(newDiv);
}

// callback function for ESP touch input
function handleTouch12() {
  console.log("called from handleTouch12");
  let someIndex = 3;
  changeColor(someIndex); // change the fill color of the 4th p5 instance
}

// change something from outside
function changeColor(index) {
  // you can access the p5 functions of the i-th p5 instance using myP5s[i-1]
  myP5s[index].fill(
    myP5s[index].random(255),
    myP5s[index].random(255),
    myP5s[index].random(255)
  );
}

// callback function for ESP touch input
function handleTouch13() {
  console.log("called from handleTouch13");
  let someIndex = 2;
  // you can access the p5 functions of the i-th p5 instance using myP5s[i-1]
  myP5s[someIndex].changeStrokeColor(); // change the stroke color
}
