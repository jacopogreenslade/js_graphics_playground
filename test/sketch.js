// import { ECS } from "./ecs/ecs";

const entities = [];

function setup() {
  createCanvas(400, 400);
  background(color(0, 0, 200));
  // fill(color(255, 0, 0));

  const squareEntity = new ECS.Entity();
  const squareTransform = new ECS.Components.Transform();
  squareTransform.position.x = 100;
  squareTransform.position.y = 100;

  squareEntity.addComponent(squareTransform);

  const squareLook = new ECS.Components.Look();
  squareLook.dimensions = { w: 20, h: 50 };
  squareLook.fill = { r: 255, g: 100, b: 100, a: 1 };
  squareLook.stroke = { r: 255, g: 0, b: 0, a: 1 };
  squareLook.strokeWeight = 0;
  // [ dashLength, gapLength ]
  squareLook.dashed = [5, 3];
  squareEntity.addComponent(squareLook);

  // squareEntity.print();

  entities.push(squareEntity);
  // console.log(entities);
}

let runOnce = true;
function draw() {
  if (runOnce) 
  {
    ECS.Systems.Renderer(entities);
      runOnce = false;
    }// background(220);
}
