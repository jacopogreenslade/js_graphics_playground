function generateClouds(size, scale, offset) {
  let result = [];
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      var n = noise(offset + i / scale, offset + j / scale);
      var gray = map(n, 0, 1, 0, 255);
      result[i*size+j] = gray;
    }
  }
  return result;
}

function setup() {
  let width = 100;
  let height = 100;
  createCanvas(width, height);
  // stroke(255);
  fill(30);
  strokeWeight(2);
  strokeCap(SQUARE);
  // for (var i = 0; i < width; i++) {
  //   for (var j = 0; j < height; j++) {
  //     var n = noise(i / 10, j / 20);
  //     var gray = map(n, 0, 1, 0, 255);
  //     // var size = map(n, 0, 1, 5, 20);
  //     // console.log(gray);
  //     // fill(gray);
  //     stroke(gray);
  //     point(i*4, j*4);
  //     // ellipse(i + 1, j + 1, 1, 1);
  //   }
  // }
  // 
}

let x = 0;
function draw() {
  generateClouds(width, 10*sin(x/10)*5, x*5).forEach((value, i) => {
    stroke(value);
    point(int(i % width), int(floor(i / width)));
    // console.log(width, i, floor(i / width))
  });

  x += 0.1;
}