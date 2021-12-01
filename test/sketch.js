// import { ECS } from "./ecs/ecs";

const entities = [];

function setup() {
  createCanvas(400, 400);
  background(color(0, 0, 200));
  // fill(color(255, 0, 0));

  const squareEntity = new ECS.Entity();

  const squareTransform = new ECS.Components.Transform(100, 100);
  const squareShape = new ECS.Components.Shape("rect", 20, 50);
  const squareLook = new ECS.Components.Look(255, 100, 100, 255, 0, 0, 3, []);
  // squareTransform.position.x = 100;
  // squareTransform.position.y = 100;

  // squareShape.type = "rect";
  // squareLook.dimensions = { w: 20, h: 50 };
  
  // squareLook.fill = { r: 255, g: 100, b: 100, a: 1 };
  // squareLook.stroke = { r: 255, g: 0, b: 0, a: 1 };
  // squareLook.strokeWeight = 0;
  // // [ dashLength, gapLength ]
  // squareLook.dashed = [5, 3];
  
  squareEntity.addComponent(squareShape);
  squareEntity.addComponent(squareTransform);
  squareEntity.addComponent(squareLook);
  
  entities.push(squareEntity);

  const lineEntity = new ECS.Entity();
  
  const lineTransform = new ECS.Components.Transform(100, 100);
  const lineShape = new ECS.Components.Shape("line", 0, 0, [{x: 15, y: 50}, {x: 333, y: 250}]);
  const lineLook = new ECS.Components.Look(255, 100, 100, 255, 0, 0, 3, [5,6]);
  // squareTransform.position.x = 100;
  // squareTransform.position.y = 100;

  // squareShape.type = "rect";
  // squareLook.dimensions = { w: 20, h: 50 };
  
  // squareLook.fill = { r: 255, g: 100, b: 100, a: 1 };
  // squareLook.stroke = { r: 255, g: 0, b: 0, a: 1 };
  // squareLook.strokeWeight = 0;
  // // [ dashLength, gapLength ]
  // squareLook.dashed = [5, 3];
  
  lineEntity.addComponent(lineShape);
  lineEntity.addComponent(lineTransform);
  lineEntity.addComponent(lineLook);
  
  entities.push(lineEntity);
}

let runOnce = true;
function draw() {
  if (runOnce) 
  {
    ECS.Systems.Renderer(entities);
      runOnce = false;
    }// background(220);
}
