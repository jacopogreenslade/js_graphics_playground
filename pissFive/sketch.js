function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < 800; i++) {
    stroke(color((i / 800) * 200, 200, 200 - (i / 800) * 200));
    line(0, i, 800, i);
  }

  console.log(line_a(4), line_b(12));
}

let x = -50;

let amplitudeMultiplier = 0.05;

let fatness = 200;

function line_a(x) {
  return (
    -70 +
    (sin(amplitudeMultiplier * x + PI) + 2.6) *
      sin(amplitudeMultiplier * x + PI) *
      50
  );
}

function line_b(x) {
  return (
    70 -
    (sin(amplitudeMultiplier * x) + 2.6) * sin(amplitudeMultiplier * x) * 50
  );
}

function line_c(x) {
  return 10 - sin(x *amplitudeMultiplier * 0.5) * (sin(x *amplitudeMultiplier * 0.5) + 3) * (cos(8 * x *amplitudeMultiplier * 0.5) - 1) * 50;
}

function draw() {
  if (x > 800) {
    return;
  }
  for (let i = 0; i < 10; i++) {
    let y = line_a(x);
    let y1 = line_b(x);
    // // console.log(y, x, y1)
    // stroke(color(sin(x / 10) * 100 + 100, 0, sin(x / 16) * 100 + 150));
    // line(fatness + y, x, fatness + y1, x);
    // stroke(color(200, sin(x / 30) * 50 + 40, 0));
    // line(fatness + y1, x, 2 * fatness + y1, x);
    
    drawArchway(x);
    
    x += 0.05;
  }
}

function drawArchway(x) {
  let y = line_c(x);
  let y1 = y + 100;
  // stroke(color(sin(x / 10) * 100 + 100, 0, sin(x / 16) * 100 + 150));
  stroke(color(200, 200, 100));

  line(x, fatness + y, x, fatness + y1);
  stroke(color(200, sin(x / 30) * 50 + 40, 0));
  line(x, y1 + fatness, x + fatness, y1 + fatness);
  line(x, y + fatness, x + fatness, y + fatness);
}
