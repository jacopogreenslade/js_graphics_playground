let canvasSize = 900;

function setup() {
  createCanvas(canvasSize, canvasSize);
  background(color(0, 0, 0));
}

let rot = 0;
let radius = 10;
let lineStep = 0;
let lineRotation = 0.5;
function draw() {

  if (radius > 350) return;

  // background(220);
  // stroke(color(255, 255, 255, 180));
  stroke(color(255, 255, 255, 255));
  let lineLength = 10;
  // let radius = 10;
  
  if (rot > 0 && rot >= 360) {
    rot = 0;
    radius += 14;
    lineRotation = -lineRotation;
  }
  
  let circumference = 2*PI*radius;
  lineStep = 360/(0.2*circumference);
  console.log(lineStep);
  rot += round(lineStep);

  
  push();
  // move to center
  translate(canvasSize / 2, canvasSize / 2);
  // rotate around circle
  angleMode(DEGREES);
  rotate(rot);
  // move out to line position
  translate(0, -radius);

  // circumference

  // rotate line to be skewed
  angleMode(RADIANS);
  rotate(lineRotation);
  line(0, -(lineLength / 2), 0, (lineLength / 2));

  pop();
  // // radius += 0.2;

  // if (rot > 6.5) {
  //   rot = 0;
  //   radius += 30;
  // }

  // stroke(color(sin(rot/3)*255, cos(rot+radius/10)*255, -sin(radius/10)*255, 180));
  // stroke(color(255, 255, 255, 180));
  // drawTread(rot, radius, 0);

  // drawTread(rot, radius / 2, -250);

  // stroke(color(0, 0, 255, 180));
  // drawTread(rot*2, radius / 3, 250);
  

  console.log(rot);
}

function drawTread(rotation, radius, translateOffset) {
  push();
  translate(translateOffset + canvasSize / 2, translateOffset + canvasSize / 2);
  rotate(rotation);
  // line(-50, -20-radius+11*sin(radius), 50, -10-radius+27*cos(radius));
  line(-50, -20-radius, 50, -10-radius);
  pop();
}