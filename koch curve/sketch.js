// import Vec from "linear.js";

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = sqrt(x * x + y * y);
  }

  normalize = () => {
    if (this.magnitude > 0) {
      return new Vec(this.x / this.magnitude, this.y / this.magnitude);
    }
  };

  scalar = (s) => new Vec(this.x * s, this.y * s);

  sum = (v) => new Vec(this.x + v.x, this.y + v.y);

  sub = (v) => new Vec(this.x - v.x, this.y - v.y);

  dot = (v) => this.x * v.x + this.y * v.y;

  scalarProjection = (v) => this.dot(v) / this.magnitude;

  getNormalLeft = () => new Vec(this.y, -1 * this.x);

  getNormalRight = () => new Vec(-1 * this.y, this.x);

  rotate = (theta) =>
    new Vec(
      this.x * cos(theta) - this.y * sin(theta),
      this.x * sin(theta) + this.y * cos(theta)
    );

  rotateCC = (theta) =>
    new Vec(
      this.x * cos(theta) + this.y * sin(theta),
      this.x * -sin(theta) + this.y * cos(theta)
    );

  flip = () => new Vec(this.y, this.x);
}

let doubleReverse = true;

class Koch {
  constructor(
    initSegments,
    maxGenerations,
    colorFunction,
    canvasWidth,
    canvasHeight,
    doubleReverse = false
  ) {
    this.doubleReverse = doubleReverse;

    this.children = [...initSegments];
    this.maxGenerations = maxGenerations;
    this.colorFunction = colorFunction ? colorFunction : () => color(255);
    this.currentGeneration = 0;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  setChildren = (newChildren) => {
    this.children = newChildren;
  };

  draw = () => {
    this.children.forEach((s) => {
      let c = this.colorFunction(s, this.canvasWidth, this.canvasHeight);
      s.draw(c);
    });
  };

  atMax = () => this.currentGeneration >= this.maxGenerations;

  newGeneration = () => {
    if (this.atMax()) {
      return;
    }
    this.setChildren(this.children.map((c) => c.generate()).flat());
    this.currentGeneration++;
  };
}

const colorFunctionGradient = (segment, width, height) => {
  // top right is mix, other corners are colors
  
  let averageV = new Vec(
    (segment.start.x + segment.end.x) / 2,
    (segment.start.y + segment.end.y) / 2
  );

  let xProp = averageV.x / width;
  let yProp = averageV.y / height;
  console.log(xProp, yProp);

  let red = 255 - xProp*255;
  let green = 255 - yProp*255;
  let blue = ((xProp*255) + (yProp*255)) / 2

  return color(red, green, blue);
};

class KochSegment {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  generate() {
    // Each segment makes 4 new ones
    let oneThirdSeg = this.end.sub(this.start).scalar(1 / 3);
    let s1End = this.start.sum(oneThirdSeg);
    // First vector
    let s1 = new KochSegment(this.start, s1End);
    // Second
    let s2Start = this.end.sub(oneThirdSeg);
    let s2 = new KochSegment(s2Start, this.end);

    // Here are the rotated vecs
    // We have to take the middle segment and rotate it
    // The middle segment is s1End, s2Start
    let trianglePoint = s1End.sum(oneThirdSeg.rotateCC(PI / 3));
    // s3 = rotate middle 60 around s1End
    let s3 = new KochSegment(s1End, trianglePoint);
    // s4 = rotate middle 60 around s2Start
    let s4 = new KochSegment(trianglePoint, s2Start);

    let reverse = [];
    if (doubleReverse) {
      reverse = [s3.flip(), s4.flip()];
    }

    return [s1, s2, s3, s4, ...reverse];
  }

  draw(color) {
    console.log(color);
    if (color) {
      stroke(color);
    }
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  flip() {
    let tempEnd = new Vec(this.end.x, this.end.y);
    let tempStart = new Vec(this.start.x, this.start.y);
    return new KochSegment(tempEnd, tempStart);
  }
}

// let children = [];
let k;
let kCurve;
function setup() {
  createCanvas(500, 700);
  strokeWeight(5);
  background(0);

  // This is so we don't hit the edges
  let offsetX = 50;
  let offsetY = 150;

  // These are just the initial segments to start with
  // 
  // A segment has 2 vectors: start, end
  k1 = new KochSegment(
    new Vec(400 + offsetX, offsetY),
    new Vec(offsetX, offsetY)
  );
  k2 = new KochSegment(
    new Vec(offsetX, offsetY),
    new Vec(200 + offsetX, 350 + offsetY)
  );
  k3 = new KochSegment(
    new Vec(200 + offsetX, 350 + offsetY),
    new Vec(400 + offsetX, offsetY)
  );

  // These are the same segments but with the points flipped. 
  // When you flip it, the koch triangle will appear on the other side
  k4 = k1.flip();
  k5 = k2.flip();
  k6 = k3.flip();

  // Now initialize the kCurve with those segments
  let initChildren = [k1, k2, k3, k4, k5, k6];
  kCurve = new Koch(initChildren, 4, colorFunctionGradient, 500, 700, true);
}

function mouseClicked() {
  // if (current >= maxGeneration) {
  //   return;
  // }
  background(0);
  kCurve.newGeneration();
  kCurve.draw();
}
