// import { ECS } from "./ecs/ecs";

function setup() {
  createCanvas(400, 400);
  fill(color(255, 0, 0));

  const squareEntity = new ECS.Entity();
  squareEntity.addComponent(new ECS.Components.Transform());
  squareEntity.addComponent(new ECS.Components.Renderer());

  squareEntity.print();
}

function draw() {
  background(220);
}
