let drawsLeft;
let x,y;
let lastX, lastY;
let xStep;
let turnXAround = false;

function init() {
  background(220);

  x = -3;
  y = 0;
  lastX = 0;
  lastY = 0;
  yOffset = 200;
  drawsLeft = 800;  
  xStep = 2;
  turnXAround = false;
  console.log(x, y, lastX, lastY, yOffset, drawsLeft, xStep);
}

function setup() {
  createCanvas(400, 400);
  strokeCap(SQUARE);
  init();
}

function draw() {
  
  if (drawsLeft > 0) {
    strokeWeight(2*perlinNoise(y+x));
    // strokeWeight(3);
    y = y + 1;
    let modifiedY = 10*perlinNoise(y)+yOffset;
    stroke(color(perlinNoise(x*y)*255, perlinNoise(y-x)*255, 100, 200));
    x = x+xStep;
    line(lastX, lastY, x, modifiedY);
    
    lastX = x;
    lastY = modifiedY;
    
    if (!turnXAround && x > (drawsLeft*xStep / 2)) {
      turnXAround = true;
      xStep = -xStep;
    }

    drawsLeft -= Math.abs(xStep);
  } else {
    init();
  }
}

function perlinNoise(x) {
  radians(x);
  return (pow(sin(x), 3) * noise(x*2) * 30);
}
