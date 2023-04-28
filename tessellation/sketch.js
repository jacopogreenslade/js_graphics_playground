
// For ease of math, we use vecors for points, which allows us to rotate, move, etc the points.
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

  rotateAround = (theta, pivot) => this
    .sum(new Vec(-pivot.x, -pivot.y))
    .rotate(radians(theta))
    .sum(new Vec(pivot.x, pivot.y));

  flip = () => new Vec(this.y, this.x);
}

class Segment {
  constructor(a, b, id) {
    this.a = a;
    this.b = b;

    this.id = id;
  }

  rotateAround = (theta, pivot) => {
    return new Segment(this.a.rotateAround(theta, pivot), this.b.rotateAround(theta, pivot), this.id);
  }

  draw = () => {
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }

  getMidpoint = () => this.a.sum(this.b).scalar(0.5);
}

class Polygon {
  constructor(segments) {
    this.segments = segments;

    this.segmentsRemaining = [...segments];
  }

  tessellate = () => this.segmentsRemaining.map(s => {
    let newPoly = this.rotateAround(180, s.getMidpoint());
    newPoly.segmentsRemaining = newPoly.segmentsRemaining.filter(seg => seg.id !== s.id);
    this.segmentsRemaining = this.segmentsRemaining.filter(seg => seg.id !== s.id);
    return newPoly;
  });

  rotateAround = (theta, pivot) => {
    return new Polygon(this.segments.map(seg => seg.rotateAround(theta, pivot)));
  }

  draw = () => {
    // stroke(color(255, 105, 180));
    // this.segments.forEach(s => s.draw());
    // stroke(color(255, 3, 3));
    this.segmentsRemaining.forEach(s => s.draw());

    // fill(255, 239, 12);
    beginShape();
    this.segments.forEach(s => {
      vertex(s.a.x, s.a.y);
    });
    endShape(CLOSE);
  }
}

/**
 * TODO: a fun exercise would be to fill a space with tessellation
    add bounds so you can use SCREEN WIDTH / HEIGHT to stop the tessellation
    
    To apply effects we can have a list of segments.

    We need a way to deduplicate verteces as we go. The segments and poligons 
    will keep track of the individual shapes, but the verteces can be single.
 */
class Tessellation {
  constructor(initialPolygon, generations=2) {
    this.polygonList = [initialPolygon];
    this.generations = generations;
  }

  go() {
    for (let i = 0; i < this.generations; i++) {
      this.polygonList = [...this.polygonList, ...this.polygonList.map(p => p.tessellate()).reduce((tot, a) => [...tot, ...a])];
    }
  }
}

let t;

function setup() {
  const screenW = 600;
  const screenH = 600;
  createCanvas(600, 600);

  const halfScreen = screenH / 2;

  // Create a hexagon
  const a = 50;   
  
  const p1 = new Vec(halfScreen + a, halfScreen);
  // const p2 = new Vec(halfScreen, halfScreen + a);
  const p2 = new Vec(halfScreen + (a / 2), halfScreen + (sqrt(3)*a / 2));
  const p3 = new Vec(halfScreen - (a / 2), halfScreen + (sqrt(3)*a / 2));
  const p4 = new Vec(halfScreen - a, halfScreen);
  const p5 = new Vec(halfScreen - (a / 2), halfScreen - (sqrt(3)*a / 2));
  const p6 = new Vec(halfScreen + (a / 2), halfScreen - (sqrt(3)*a / 2));
  const s1 = new Segment(p1, p2, "s1");
  const s2 = new Segment(p2, p3, "s2");
  const s3 = new Segment(p3, p4, "s3");
  const s4 = new Segment(p4, p5, "s4");
  const s5 = new Segment(p5, p6, "s5");
  const s6 = new Segment(p6, p1, "s6");


  const poly1 = new Polygon([s1, s2, s3, s4, s5, s6]);

  background(255);
  strokeWeight(3);

   t = new Tessellation(poly1, 5);
  t.go();

  console.log(t);

  let base255 = (n) => n%255;

  t.polygonList.forEach((p, i) => {
    stroke(color(base255(i*10), base255(i*10), base255(i*15)));
    fill(color(base255(i*10), base255(i*10), base255(i*14)))
    p.draw();
  });
}

const moveAllVertsBySin = (time, range) => {
  t.polygonList.forEach(p => {
    p.segments.forEach(s => {
      let currentSin = sin(time * s.a.x);
      s.a.x = s.a.x + (currentSin * range);
      s.a.y = s.a.y + (currentSin * range);
    });
  })
}

// let time = 0.0;
// function draw() {
//   moveAllVertsBySin(time, 0.3);
//   let base255 = (n) => n%255;
  
//   clear(0);
//   background(0);
//   t.polygonList.forEach((p, i) => {
//     stroke(color(base255(i*255), base255(i*105), base255(i*180)));
//     fill(color(base255(i*0), base255(i*234), base255(i*14)))
//     p.draw();
//   });
  
//   time += 0.2;
// }

/**
How to deduplicate verteces and segments

Knowns:
- the segment that we are rotating around and it's verts can be removed
- the verts will be swapped after roation

Unknowns:
- will the other verts have dupes?

Dumb solution:

If we link polygons with their adjacient polys then we only have to check those for dupes!
OR we can link polys to segments, then you can get the adjacient polys by segment
NOTE: This might not be a good strategy, because the dupes might be with a non-adjacient polygon

declare:
 vertList : []
 segmentList : []
 polygonList : []

- copy all verts and segments (A, B, C, D)
- rotate them about the segment A
( We have to copy the points and segments to avoid messing the original's values )
- Remove the copy of segment A and it's verts
- Replace them with the original segment A and verts
- Check the remaining verts for duplicates against the vertexList
- Check the remaining segments for duplicates against the segmentList

*/