// Includes math.js

// const { math } = require("./libraries/math");

// let { math } = require("./libraries/math");

let SCREEN_HEIGHT = 400;
let SCREEN_WIDTH = 800;

let aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;

// theta
let fieldOfView;
let fov;

let zNearPlane;
let zFarPlane;
let q;
// let zCoeff = q - (zNearPlane * q);

// Working backward from the vector [afx/z, fy/z, zq-znear*q]
let projectionMatrix;

let triangle;

let getRotateX, getRotateZ;

function initRenderer() {
  SCREEN_HEIGHT = 400;
  SCREEN_WIDTH = 800;
  aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  // theta
  fieldOfView = 90;
  fov = 1 / tan((fieldOfView / 2) * (180 / PI));
  zNearPlane = 2;
  zFarPlane = 100;
  q = zFarPlane / (zFarPlane - zNearPlane);
  // Working backward from the vector [afx/z, fy/z, zq-znear*q]
  projectionMatrix = math.matrix([
    [aspectRatio * fov, 0, 0, 0],
    [0, fov, 0, 0],
    [0, 0, q, -zNearPlane * q],
    [0, 0, 1, 0],
  ]);
  triangle = [
    // x1   y1   z1    x2   y2   z2    x3   y3   z3
    math.matrix([0.0, -0.5, 0.0, 1.0]),
    math.matrix([-0.5, 0.5, 0.0, 1.0]),
    math.matrix([0.5, 0.5, 0.0, 1.0]),
  ];

  triangle1 = new Triangle(
    math.matrix([0.0, -0.5, 0.0, 1.0]),
    math.matrix([-0.5, 0.5, 0.0, 1.0]),
    math.matrix([0.5, 0.5, 0.0, 1.0]),
    new Transform(math.matrix([0.0, 0.0, -4.0]))
  );

  getRotateZ = (time) =>
    math.matrix([
      [1, 0, 0, 0],
      // [0, cos(time*0.001), sin(time*0.001), 0],
      // [0, -sin(time*0.001), cos(time*0.001), 0],
      [0, cos(time * 0.001), sin(time * 0.001), 0],
      [0, -sin(time * 0.001), cos(time * 0.001), 0],
      [0, 0, 0, 1],
    ]);

  getRotateX = (time) =>
    math.matrix([
      [cos(time * 0.001), 0, -sin(time * 0.001), 0],
      // [0, cos(time*0.001), sin(time*0.001), 0],
      // [0, -sin(time*0.001), cos(time*0.001), 0],
      [0, 1, 0, 0],
      [sin(time * 0.001), 0, cos(time * 0.001), 0],
      [0, 0, 0, 1],
    ]);

  // [1, cos(time)]
}

/**
 * A simple triangle class.
 * p1, p2, p3 are 3 matrices for the 3 points.
 * location is the
 */
class Triangle {
  constructor(pA=math.matrix([0,0,0,0]), pB=math.matrix([0,0,0,0]), pC=math.matrix([0,0,0,0]), t = new Transform()) {
    this.p1 = pA;
    this.p2 = pB;
    this.p3 = pC;
    this.transform = t;
  }
}

class Transform {
  constructor(
    l = math.matrix([0, 0, 0]),
    r = math.matrix([0, 0, 0]),
    s = math.matrix([1, 1, 1])
  ) {
    this.location = l;
    this.rotation = r;
    this.scale = s;
  }
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

  initRenderer();
}


function processTriangle(t) {

  const modifiedTriangle = new Triangle();
  // modifiedTriangle.p1 = math.multiply(t.p1, getRotateX(millis()));
  // modifiedTriangle.p2 = math.multiply(t.p2, getRotateX(millis()));
  // modifiedTriangle.p3 = math.multiply(t.p3, getRotateX(millis()));

  // modifiedTriangle.p1 = math.multiply(modifiedTriangle.p1, getRotateZ(2 * millis()));
  // modifiedTriangle.p2 = math.multiply(modifiedTriangle.p2, getRotateZ(2 * millis()));
  // modifiedTriangle.p3 = math.multiply(modifiedTriangle.p3, getRotateZ(2 * millis()));

  const translation =  math.identity(4, 4).subset(math.index(3,[0,1,2]), t.transform.location);

  const xAngle = t.transform.rotation.subset(math.index(0));
  const yAngle = t.transform.rotation.subset(math.index(1));
  const zAngle = t.transform.rotation.subset(math.index(2));

  console.log(xAngle, yAngle, zAngle);

  const rotationX =  math.matrix([
    [1, 0, 0, 0], 
    [0, cos(xAngle), sin(xAngle), 0], 
    [0, -sin(xAngle), cos(xAngle), 0], 
    [0, 0, 0, 1]]);
    const rotationY =  math.matrix([
      [cos(yAngle), 0, -sin(yAngle), 0], 
      [0, 1, 0, 0], 
      [sin(yAngle), 0, cos(yAngle), 0], 
      [0, 0, 0, 1]]);
    const rotationZ =  math.matrix([
      [cos(zAngle), sin(zAngle), 0, 0], 
      [-sin(zAngle), cos(zAngle),0, 0], 
      [0, 0, 1, 0], 
      [0, 0, 0, 1]]);

  const rotation = math.multiply(rotationZ, rotationY, rotationX);

  const scale = math.matrix([
    [t.transform.scale.subset(math.index(0)), 0, 0, 0], 
    [0, t.transform.scale.subset(math.index(1)), 0, 0], 
    [0, 0, t.transform.scale.subset(math.index(2)), 0], 
    [0, 0, 0, 1]]);

  modifiedTriangle.p1 = math.multiply(t.p1, scale, rotation, translation);
  modifiedTriangle.p2 = math.multiply(t.p2, scale, rotation, translation);
  modifiedTriangle.p3 = math.multiply(t.p3, scale, rotation, translation);

  // Move triangle
  // modifiedTriangle.p1 = math.multiply(modifiedTriangle.p1, math.identity(4, 4).subset(math.index(3,[0,1,2]), t.transform.location));
  // modifiedTriangle.p2 = math.multiply(modifiedTriangle.p2, math.identity(4, 4).subset(math.index(3,[0,1,2]), t.transform.location));
  // modifiedTriangle.p3 = math.multiply(modifiedTriangle.p3, math.identity(4, 4).subset(math.index(3,[0,1,2]), t.transform.location));

  modifiedTriangle.p1 = math.multiply(modifiedTriangle.p1, projectionMatrix);
  modifiedTriangle.p2 = math.multiply(modifiedTriangle.p2, projectionMatrix);
  modifiedTriangle.p3 = math.multiply(modifiedTriangle.p3, projectionMatrix);

  // console.log(x, y, z);
  // divide x and y by z... Not sure why this isn't happening automatically...
  modifiedTriangle.p1.subset(math.index(0),modifiedTriangle.p1.subset(math.index(0)) * (1 / modifiedTriangle.p1.subset(math.index(2))));
  modifiedTriangle.p1.subset(math.index(1),modifiedTriangle.p1.subset(math.index(1)) * (1 / modifiedTriangle.p1.subset(math.index(2))));
  modifiedTriangle.p2.subset(math.index(0),modifiedTriangle.p2.subset(math.index(0)) * (1 / modifiedTriangle.p2.subset(math.index(2))));
  modifiedTriangle.p2.subset(math.index(1),modifiedTriangle.p2.subset(math.index(1)) * (1 / modifiedTriangle.p2.subset(math.index(2))));
  modifiedTriangle.p3.subset(math.index(0),modifiedTriangle.p3.subset(math.index(0)) * (1 / modifiedTriangle.p3.subset(math.index(2))));
  modifiedTriangle.p3.subset(math.index(1),modifiedTriangle.p3.subset(math.index(1)) * (1 / modifiedTriangle.p3.subset(math.index(2))));

  // Add 1 to the x and y
  modifiedTriangle.p1.subset(math.index(0), modifiedTriangle.p1.subset(math.index(0)) + 1.0);
  modifiedTriangle.p1.subset(math.index(1), modifiedTriangle.p1.subset(math.index(1)) + 1.0);
  modifiedTriangle.p2.subset(math.index(0), modifiedTriangle.p2.subset(math.index(0)) + 1.0);
  modifiedTriangle.p2.subset(math.index(1), modifiedTriangle.p2.subset(math.index(1)) + 1.0);
  modifiedTriangle.p3.subset(math.index(0), modifiedTriangle.p3.subset(math.index(0)) + 1.0);
  modifiedTriangle.p3.subset(math.index(1), modifiedTriangle.p3.subset(math.index(1)) + 1.0);

  // console.log(x, y, z);

  modifiedTriangle.p1.subset(math.index(0), modifiedTriangle.p1.subset(math.index(0)) * SCREEN_WIDTH * 0.5);
  modifiedTriangle.p1.subset(math.index(1), modifiedTriangle.p1.subset(math.index(1)) * SCREEN_HEIGHT * 0.5);
  modifiedTriangle.p2.subset(math.index(0), modifiedTriangle.p2.subset(math.index(0)) * SCREEN_WIDTH * 0.5);
  modifiedTriangle.p2.subset(math.index(1), modifiedTriangle.p2.subset(math.index(1)) * SCREEN_HEIGHT * 0.5);
  modifiedTriangle.p3.subset(math.index(0), modifiedTriangle.p3.subset(math.index(0)) * SCREEN_WIDTH * 0.5);
  modifiedTriangle.p3.subset(math.index(1), modifiedTriangle.p3.subset(math.index(1)) * SCREEN_HEIGHT * 0.5);

  return modifiedTriangle;
}

function drawTriangle(t) {
  line(
    t.p1.subset(math.index(0)),
    t.p1.subset(math.index(1)),
    t.p2.subset(math.index(0)),
    t.p2.subset(math.index(1))
  );
  line(
    t.p2.subset(math.index(0)),
    t.p2.subset(math.index(1)),
    t.p3.subset(math.index(0)),
    t.p3.subset(math.index(1))
  );
  line(
    t.p1.subset(math.index(0)),
    t.p1.subset(math.index(1)),
    t.p3.subset(math.index(0)),
    t.p3.subset(math.index(1))
  );
}

function draw() {
  background(150);

  triangle1.transform.rotation = math.matrix([millis()*0.005, millis()*0.001, 0]);
  triangle1.transform.location = math.matrix([sin(millis()*0.003)*5, 0, -4]);


  let processedT = processTriangle(triangle1);

  strokeWeight(5);
  stroke(color(255, 255, 0));
  drawTriangle(processedT);
}
