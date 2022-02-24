// const linearDiffEq = (x, y, P, Q) => {
//   return (2 * (e^x)) - y1 - 2 * y
// }

let canvasWidth = 400;
let canvasHeight = 400;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

// Plan:
// Update x and y and change C for each 

let x = 0;
let y = 0;

let constants = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 -10, -20, -30, -40, -50, -60, -70, -80, -90, -100, 1000, 2000, -1000, -2000];
// let constants = [0];


const diffEQ = (x, C) => (1/50)*x*x+C;

const diffEQ2 = (x, C) => cos(x)-pow(x, sin(x)*0.5*Math.E)+C;

// Solution to 
// y' = x^2 - y
const diffEQ3 = (x, C) => (x*x)-(2*x)+2+(C/pow(Math.E, x))



function draw() {
  let rBound = (canvasWidth / 2);
  let lBound = -rBound;

  // let rBound = canvasWidth;
  // let lBound = 0;

  if (x < lBound || x > rBound) {
    return;
  }
  // background(220);

  // line(10,10, 200, 200);
  
  push();
  translate(canvasWidth / 2, canvasHeight / 2);
  console.log(x);
  
  constants.sort().map((c, i) => {
    // console.log(x, "I ran twice")
    stroke(color(255*(i/constants.length), 255-255*(i/constants.length), 0));
    point(x*15, -diffEQ3(x, c*5));
  });

  // point(x, -x^2);

  // point(x, 0);
  
  x += deltaTime * 0.0005;
  pop();
}
