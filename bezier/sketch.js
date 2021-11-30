// Given a curve from P1 to P2
let point1;
let point2;
let anchor1;
let anchor2;
let pointRadius;
let overPoint;

function setup() {
  point1 = { x: 30, y: 20 };
  point2 = { x: 30, y: 150 };

  anchor1 = {
    x: 80,
    y: 25,
    color: color(0, 255, 0),
    defaultColor: color(0, 255, 0),
  };
  anchor2 = {
    x: 80,
    y: 250,
    color: color(255, 0, 0),
    defaultColor: color(255, 0, 0),
  };

  pointRadius = 5;

  draw2PointCurve(point1, point2, anchor1, anchor2);
}

function draw2PointCurve(p1, p2, a1, a2) {
  createCanvas(400, 400);
  noFill();
  beginShape();
  vertex(p1.x, p1.y);
  bezierVertex(a1.x, a1.y, a2.x, a2.y, p2.x, p2.y);

  vertex(30, 500);
  endShape();

  // This should show what is what:
  // Anchor Points:
  strokeWeight(10);
  stroke(color(0, 255, 0));
  point(p1.x, p1.y);
  stroke(color(255, 0, 0));
  point(p2.x, p2.y);

  // Control Points (with lines)
  // p1
  strokeWeight(10);
  stroke(a1.color);
  point(a1.x, a1.y);
  // anchor1
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 3]);
  line(p1.x, p1.y, a1.x, a1.y);

  // p2
  strokeWeight(pointRadius * 2);
  stroke(a2.color);
  point(a2.x, a2.y);
  //anchor2
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 3]);
  line(p2.x, p2.y, a2.x, a2.y);

  // Reset line
  drawingContext.setLineDash([]);
  // line(p2.x + 50, p2.y + 50, anchor2.x + 50, anchor2.y + 50);
}

let locked = false;
let selectedPoint;

function draw() {
  let previousHover = overPoint;
  const anchors = [anchor1, anchor2];
  anchors.forEach((a) => {
    if (
      mouseX > a.x - pointRadius &&
      mouseX < a.x + pointRadius &&
      mouseY > a.y - pointRadius &&
      mouseY < a.y + pointRadius
    ) {
      if (!locked) {
        a.color = color(0);
      }
	  selectedPoint = a;
    } else {
      a.color = a.defaultColor;
      overPoint = false;
	  if (selectedPoint === a) {
		  selectedPoint = null;
	  }
    }
  });
	draw2PointCurve(point1, point2, anchor1, anchor2);
}

function mousePressed() {
  if (selectedPoint) {
    locked = true;
    selectedPoint.color = color(100, 100, 100);
} else {
	locked = false;
}
	xOffset = mouseX - selectedPoint.x;
	yOffset = mouseY - selectedPoint.y;
}

function mouseDragged() {
  if (locked && selectedPoint) {
    selectedPoint.x = mouseX - xOffset;
    selectedPoint.y = mouseY - yOffset;
  }
}

function mouseReleased() {
  locked = false;
  selectedPoint = null;

  xOffset = mouseX;
  yOffset = mouseY;
}
