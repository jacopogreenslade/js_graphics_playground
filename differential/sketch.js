let canvasWidth = 1000;
let canvasHeight = 1000;

// let l;
let lines = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  const bounds = {
    xL: (-1 * canvasWidth) / 2,
    xR: canvasWidth / 2,
    y1: canvasHeight / 2,
    y2: (-1 * canvasHeight) / 2,
  };
  // initialize the colors
  lines.push(new Line(-10, 0, inversediffEQ3, 0, simpleLineDraw, bounds, getRandomColor(), "Line A"));
  // lines.push(new Line(-5, 0, inversediffEQ3, -2.5, simpleLineDraw, bounds, getRandomColor(), "Line B"));
  lines.push(new Line(-5, 0, inversediffEQ3, -10, simpleLineDraw, bounds, getRandomColor(), "Line C"));
  // lines.push(new Line(-5, 0, inversediffEQ3, 10, simpleLineDraw, bounds, getRandomColor(), "Line D"));
  lines.push(new Line(-10, 0, inversediffEQ3, -2, simpleLineDraw, bounds, getRandomColor(), "Line E"));
  lines.push(new Line(-10, 0, inversediffEQ3, -0.05, simpleLineDraw, bounds, getRandomColor(), "Line F"));
  lines.push(new Line(-10, 0, inversediffEQ3, -0.025, simpleLineDraw, bounds, getRandomColor(), "Line G"));
  lines.push(new Line(-10, 0, inversediffEQ3, -20000, simpleLineDraw, bounds, getRandomColor(), "Line H"));
  lines.push(new Line(-10, 0, inversediffEQ3, -5000000, simpleLineDraw, bounds, getRandomColor(), "Line I"));


}

function getRandomColor() {
  return color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
}

// Plan:
// Update x and y and change C for each

// let constants = [0];

const diffEQ = (x, C) => (1 / 50) * x * x + C;

const diffEQ2 = (x, C) => cos(x) - pow(x, sin(x) * 0.5 * Math.E) + C;

// Solution to
// y' = x^2 - y
const diffEQ3 = (x, C) => x * x - 2 * x + 2 + C / pow(Math.E, x);

const inversediffEQ3 = (x, C) => -diffEQ3(x, C*5)*15; 

class Line {
  constructor(x, y, f, C, draw, bounds, col, friendlyName) {
    this.x = x;
    this.y = y;
    this.fOfX = f;
    this.constant = C;

    this.bounds = bounds;
    this.draw = draw;

    this.previous = null;

    this.color = col;

    this.friendlyName = friendlyName;

    this.scale = 20;
  }

  setup() {
    // Start the line
  }

  xUpdateFunction = (dTime) => this.x + dTime * 0.0005;

  log = (...params) => console.log(this.friendlyName, ...params);

  update(dTime) {
    // update x
    this.x = this.xUpdateFunction(dTime);

    // if x is not in bounds stop
    if (this.x < this.bounds.xL || this.x > this.bounds.xR) {
      return;
    }
    
    this.y = this.fOfX(this.x, this.constant);
    // -diffEQ3(x, c * 5) * 5
    if (this.y > this.bounds.y1 || this.y < this.bounds.y2) {
      return;
    }
    this.log("Drawing something because we're in bounds", this.x, this.y);
    
    // Now do the doing!
    this.draw(this);
    this.previous = { x: this.x * this.scale, y: this.y };
  }
}

function simpleLineDraw(l) {
  push();
  translate(canvasWidth / 2, canvasHeight / 2);
  stroke(l.color);

  if (l.previous) {
    line(l.previous.x, l.previous.y, l.x*l.scale, l.y);
  } else {
    point(l.x*l.scale, l.y);
  }

  pop();
}

function draw() {
  lines.forEach(l => l.update(deltaTime));
}
