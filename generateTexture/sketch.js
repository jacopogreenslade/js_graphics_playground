
  let x, y;
function setup() {
  createCanvas(3200, 3200);
  x = 150;
  y = 150;
  strokeWeight(5);
  
  let col = color(255, 255, 0);
  stroke(col);
  gradientCircle(x, y, 40, 100, col);
  
  col = color(255, 0, 0);
  stroke(col);
  gradientCircle(x+29, y-54, 70, 5, col);

  col = color(0, 255, 255);
  stroke(col);
  gradientCircle(21, 99, 90, 40, col);
  

  x = 0;
  y=0;
}

function getRightTriangleSideLength(a, h) {
  return sqrt(h*h - a*a);
}

function gradientCircle(x, y, r, step=10, col=color(255, 0, 0)) {
  push();
  console.log(col);
  for (let i = 0; i < step; i++) {
    let offset = (i*(r * 2 / step));
    let lineY = y - r + offset;
    let aX = -getRightTriangleSideLength(y - lineY, r);
    let bX = -aX;
    // console.log("lineY", lineY, "increment", offset);
    // console.log(aX, lineY, bX, lineY);
    // 
    // TODO: this doesn't actually lerp from color to color
    stroke(color(col._getRed(), (i/step)*255, col._getGreen()));
    line(x+ aX, lineY, x+ bX, lineY);
  }
  pop();

}


function draw() {

  if (y > 3200) { return; }

  y += 0.2;
  let direction = sin(y / 10) > 0 ? 1 : -1;
  x += direction*3;
  stroke(color(255, 0, 0));
  // line(x + 100, y, x+ 150, y);
  col = color(0, 255, 255);
  stroke(col);
  gradientCircle(x + 100, y + 100, 30, 50, col);
}
