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


ECS.Components.Look = class Look {
    constructor() {
        this.type = "rect";
        // TODO: figure out where the dimension should live...
        this.dimensions = { w: 0, h: 0 };
        this.fill = { r: 0, g: 0, b: 0, a: 0 };
        this.stroke = { r: 0, g: 0, b: 0, a: 0 };
        this.strokeWeight = 0;
        // [ dashLength, gapLength ]
        this.dashed = [];
    }
}
ECS.Components.Look.prototype.name = 'look';


ECS.Components.RenderSquare = class RenderSquare {
    constructor() {
        this.mode
    }
}