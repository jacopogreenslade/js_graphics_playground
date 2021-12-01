// import { ECS } from "./ecs/ecs";

const entities = [];
const systems = [
  // ECS.Systems.Movement,
  ECS.Systems.Renderer
];

function setup() {
  createCanvas(400, 400);
  background(color(0, 0, 200));
  // fill(color(255, 0, 0));
  // 
  rectMode(CENTER);

  const squareEntity = new ECS.Entity();
  const squareTransform = new ECS.Components.Transform(100, 100);
  const squareShape = new ECS.Components.Shape("rect", 20, 50);
  const squareLook = new ECS.Components.Look(255, 100, 100, 255, 0, 0, 3, []);
  squareEntity.addComponent(squareShape);
  squareEntity.addComponent(squareTransform);
  squareEntity.addComponent(squareLook);
  entities.push(squareEntity);

  const lineEntity = new ECS.Entity();
  const lineTransform = new ECS.Components.Transform(22, 100);
  const lineShape = new ECS.Components.Shape("line", 0, 0, [{x: 15, y: 50}, {x: 333, y: 250}]);
  const lineLook = new ECS.Components.Look(255, 0, 100, 0, 255, 255, 3, [5,6]);  
  lineEntity.addComponent(lineShape);
  lineEntity.addComponent(lineTransform);
  lineEntity.addComponent(lineLook);
  entities.push(lineEntity);

  const circleEntity = new ECS.Entity();
  const circleTransform = new ECS.Components.Transform(350, 220);
  const circleShape = new ECS.Components.Shape("circle", 0, 0, [], 20);
  const circleLook = new ECS.Components.Look(0, 100, 100, 0, 255, 0, 3, [2,10]);  
  circleEntity.addComponent(circleShape);
  circleEntity.addComponent(circleTransform);
  circleEntity.addComponent(circleLook);
  entities.push(circleEntity);
}

let runOnce = true;
function draw() {
  background(color(0, 0, 200));
  entities[0].components.transform.rotation += 0.03;
  systems.forEach(s => s(entities));
  // ECS.Systems.Renderer(entities);
  
  if (runOnce) 
  {
      runOnce = false;
    }// background(220);
}
