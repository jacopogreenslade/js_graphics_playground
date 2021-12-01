# ECS

This is a basic js entity component system (ECS). It currently has some basic P5 implementations of shapes and a renderer, but the functionality should extend to a pure JS project if needed.

## Usage with P5
``` javascript
// Create a list of entities
// eventually, we'll want this to be like { entity_id: entity } to previent duplicates
const entities = [];

// Create the components. Transform, Shape, and Look are the basic components we need to render:
const squareTransform = new ECS.Components.Transform(100, 100);
const squareShape = new ECS.Components.Shape("rect", 20, 50);
const squareLook = new ECS.Components.Look(255, 100, 100, 255, 0, 0, 3, []);

// Add components to the entity
squareEntity.addComponent(squareShape);
squareEntity.addComponent(squareTransform);
squareEntity.addComponent(squareLook);

// Add entity to the list
entities.push(squareEntity);

// Create the list of systems
// Order matters! If you render before moving an object you will be off by a frame!
const systems = [ ECS.Systems.Renderer, ...]

// Run the systems on the entity list
// The system constructor runs the code, and takes the entity list as param
system.forEach(s => s(entities))

// to run the render every frame you could do this:
function draw() {
    // clear background
    background(color(0, 0, 200));
    // update the square to rotate
    entities[0].components.transform.rotation += 0.03;
    // Run the systems
    systems.forEach(s => s(entities));
}


```

> The ECS only renders what you give it. You will have to take care of clearing the screen each frame, or creating a component and system that does that for you before every render.