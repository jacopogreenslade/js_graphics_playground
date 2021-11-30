// import ECS from "./ecs";

ECS.Components = {};

ECS.Components.Transform = class Transform {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.rotation = 0;
        this.scale = { x: 0, y: 0 };
    }
}
ECS.Components.Transform.prototype.name = 'transform';


ECS.Components.Renderer = class Renderer {
    constructor() {
        this.fill = { r: 0, g: 0, b: 0, a: 0 };
        this.stroke = { r: 0, g: 0, b: 0, a: 0 };
        this.strokeWeight = 0;
        // [ dashLength, gapLength ]
        this.dashed = [];
    }
}
ECS.Components.Renderer.prototype.name = 'renderer';


ECS.Components.RenderSquare = class RenderSquare {
    constructor() {
        this.mode
    }
}