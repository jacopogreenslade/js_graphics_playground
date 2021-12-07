
function setup() {
  createCanvas(800, 800);

  for(let i = 0; i < 800; i++) {
    stroke(color((i/800)*200, 200, 200-(i/800)*200));
    line(0, i, 800, i);
  }

  console.log(line_a(4), line_b(12));
}

let x = 0;

let amplitudeMultiplier = .05;

let fatness = 200;

function line_a(x){
return -70+(sin(amplitudeMultiplier*x+PI)+2.6)*sin(amplitudeMultiplier*x+PI)*50
}


function line_b(x){
  return 70 - (sin(amplitudeMultiplier*x)+2.6) * sin(amplitudeMultiplier*x)*50
  }

function draw() {
  if (x > 800) {return;}
  for (let i = 0; i< 10; i++) {
    let y = line_a(x);
    let y1= line_b(x);
    // console.log(y, x, y1)
    stroke(color(sin(x/10)*(100)+100,0,sin(x/16)*(100)+150));
    line(fatness+ y,x,fatness+ y1,x);
    stroke(color(200, sin(x/30)*(50) + 40, 0));
     line(fatness+y1,x,2*fatness+y1,x);
    x+=0.05;
  }

}



  
