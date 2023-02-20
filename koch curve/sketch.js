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

    this.initSegments = initSegments;
    this.children = [...initSegments];
    this.maxGenerations = maxGenerations;
    this.colorFunction = colorFunction ? colorFunction : () => color(255);
    this.currentGeneration = 0;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  reset = () => {
    delete this.children;
    this.children = [...this.initSegments];
    this.currentGeneration = 0;
  };

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
    let start = millis();
    this.setChildren(this.children.map((c) => c.generate()).flat());
    this.currentGeneration++;
    console.log("Time", millis() - start, "Generation", this.currentGeneration);
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

  let red = 255 - xProp * 255;
  let green = 255 - yProp * 255;
  let blue = (xProp * 255 + yProp * 255) / 2;

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

function createInitialSegments(
  shape = "TRIANGLE",
  sideLength,
  offsetX = 50,
  offsetY = 150,
  flip = false
) {
  // let offsetX = 50;
  // let offsetY = 150;

  let initChildren = [];

  let tl, tr, bl, br;
  switch (shape) {
    case "TRIANGLE":
      // These are just the initial segments to start with
      //
      // A segment has 2 vectors: start, end

      // Start at top left
      tl = new Vec(offsetX, offsetY);
      tr = new Vec(offsetX + sideLength, offsetY);

      let bc = tl.sum(tr.sub(tl).rotate(PI / 3));

      k1 = new KochSegment(tl, tr);
      k2 = new KochSegment(tr, bc);
      k3 = new KochSegment(bc, tl);

      initChildren = [k1, k2, k3];
      break;
    case "SQUARE":
      // offsetX = 100;
      // These are just the initial segments to start with
      //
      // A segment has 2 vectors: start, end
      // let sideLength = 300;
      tl = new Vec(offsetX, offsetY);
      tr = new Vec(offsetX + sideLength, offsetY);
      bl = new Vec(offsetX, offsetY + sideLength);
      br = new Vec(offsetX + sideLength, offsetY + sideLength);

      k1 = new KochSegment(tl, tr);
      k2 = new KochSegment(tr, br);
      k3 = new KochSegment(br, bl);
      k4 = new KochSegment(bl, tl);

      initChildren = [k1, k2, k3, k4];
      break;
    case "HEXAGON":
      // Make a side then rotate it 6 times
      tl = new Vec(offsetX, offsetY);
      tr = new Vec(offsetX + sideLength, offsetY);
      let sideV = tr.sub(tl);

      let p3 = tr.sum(sideV.rotate(PI / 3));
      let p4 = p3.sum(sideV.rotate((PI / 3) * 2));
      let p5 = p4.sub(sideV);
      let p6 = p5.sum(sideV.rotateCC((PI / 3) * 2));

      k1 = new KochSegment(tl, tr);
      k2 = new KochSegment(tr, p3);
      k3 = new KochSegment(p3, p4);
      k4 = new KochSegment(p4, p5);
      k5 = new KochSegment(p5, p6);
      k6 = new KochSegment(p6, tl);

      initChildren = [k1, k2, k3, k4, k5, k6];
      break;
  }

  // These are the same segments but with the points flipped.
  // When you flip it, the koch triangle will appear on the other side
  // let flipped = [];
  if (flip) {
    initChildren = initChildren.map((item) => item.flip());
  }

  // Now initialize the kCurve with those segments
  return [...initChildren];
}

function setup() {
  createCanvas(500, 700);
  strokeWeight(2);
  background(0);

  // This is so we don't hit the edges
  // let initChildren = createInitialSegments(
  //   "TRIANGLE",
  //   (sideLength = 350),
  //   (offsetX = 50),
  //   (offsetY = 200),
  //   (flip = false)
  // );

  let initChildren = createInitialSegments(
    "HEXAGON",
    (sideLength = 200),
    (offsetX = 150),
    (offsetY = 100),
    (flip = false)
  );
  initChildren = [
    ...initChildren,
    ...createInitialSegments(
      "HEXAGON",
      (sideLength = 180),
      (offsetX = 160),
      (offsetY = 115),
      (flip = true)
    ),
    ...createInitialSegments(
      "TRIANGLE",
      (sideLength = 180),
      (offsetX = 160),
      (offsetY = 220),
      (flip = true)
    ),
  ];

  // let initChildren = createInitialSegments("SQUARE", sideLength=350, offsetX=75, offsetY=125, flip=true);
  // initChildren = [...initChildren, ...createInitialSegments("SQUARE", sideLength=250, offsetX=125, offsetY=175, flip=false)]
  kCurve = new Koch(initChildren, 4, colorFunctionGradient, 500, 700, true);

  kCurve.draw();
}

function mouseClicked() {
  if (kCurve.atMax()) {
    kCurve.reset();
    background(0);
    kCurve.draw();
  }
  background(0);
  kCurve.newGeneration();
  kCurve.draw();
}
