// import ECS from "./ecs";

ECS.Components = {};

ECS.Components.Transform = class Transform {
    constructor(posX=0, posY=0, scaleX=0, scaleY=0, rot=0) {
        this.position = { x: posX, y: posY };
        this.rotation = rot;
        this.scale = { x: scaleX, y: scaleY };
    }
}
ECS.Components.Transform.prototype.name = 'transform';


ECS.Components.Look = class Look {
    constructor(fR=0, fG=0, fB=0, sR=0, sG=0, sB=0, sWeight=0, dashedLineArray=[]) {
        // TODO: figure out where the dimension should live...
        this.fill = { r: fR, g: fG, b: fB, a: 0 };
        this.stroke = { r: sR, g: sG, b: sB, a: 0 };
        this.strokeWeight = sWeight;
        // [ dashLength, gapLength ]
        this.dashed = dashedLineArray;
    }
}
ECS.Components.Look.prototype.name = 'look';

ECS.Components.Shape = class Shape {
    constructor(shapeType="rect", dW=0, dH=0, points=[], radius=0) {
        this.type = shapeType;
        // TODO: figure out where the dimension should live...
        this.dimensions = { w: dW, h: dH };
        this.points = points;
        this.radius = radius;
    }
}
ECS.Components.Shape.prototype.name = 'shape';

/**
 * Allows user to interact with entity
 */
ECS.Components.Interactible = class Interactible {
    constructor() {
        this.selected = false;
    }

    hover() {}
    click() {}
    release() {}
}
ECS.Components.Interactible.prototype.name = 'interactible';
