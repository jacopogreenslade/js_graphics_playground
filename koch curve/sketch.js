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
    stroke(color);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  flip() {
    let tempEnd = new Vec(this.end.x, this.end.y);
    let tempStart = new Vec(this.start.x, this.start.y);
    return new KochSegment(tempEnd, tempStart);
  }
}

let children = [];
let k;
function setup() {
  createCanvas(500, 700);

  strokeWeight(1);
  background(0);

  let offsetX = 50;
  let offsetY = 150;

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

  k4 = new KochSegment(
    new Vec(offsetX, offsetY),
    new Vec(400 + offsetX, offsetY)
  );
  k5 = new KochSegment(
    new Vec(200 + offsetX, 350 + offsetY),
    new Vec(offsetX, offsetY)
  );
  k6 = new KochSegment(
    new Vec(400 + offsetX, offsetY),
    new Vec(200 + offsetX, 350 + offsetY)
  );

  children = [k1, k2, k3, k4, k5, k6];

  stroke(color(255, 0, 0));
  stroke(color(200, 0, 255));
}

function newGeneration() {
  children = children.map((s) => s.generate()).flat();
}

function renderKoch() {
  children.map((s, i) => {
    let c  = (i / children.length) * 255;
    // console.log(r);
    s.draw(
      color(
        255 - c,
        abs((255 / 2) - c),
        c
      )
    );
  });
}

// NOTE: Stopped it at 4 to prevent freezing
let maxGeneration = 4;
let current = 0;

function mouseClicked() {
  if (current >= maxGeneration) {
    return;
  }
  background(0);
  newGeneration();
  renderKoch();
  current++;
}
