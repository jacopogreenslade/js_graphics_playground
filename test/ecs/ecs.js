// A simple entity component system I can use for p5
// 
const ECS = {};

ECS.Entity = class Entity {
    constructor() {
        this.id = (+new Date()).toString(16) + 
        (Math.random() * 100000000 | 0).toString(16) +
        ECS.Entity.prototype._count;

        this.components = {};

        ECS.Entity.prototype._count++;
    }

    addComponent (component) {
        let name = component.name;
        this.components[name] = component;
    }

    removeComponent (name) {
        delete this.components[name];
    }

    print() {
        console.log(JSON.stringify(this, null, 2));
    }
};

ECS.Entity.prototype._count = 0;


// ECS.Components.Test = function ComponentTest ( value = 34 ) {
//     this.value = value;
//     return this;
// }
// ECS.Components.Test.prototype.name = 'test';

// const testEntity = new ECS.Entity();
// testEntity.addComponent(new ECS.Components.Test(88));

// testEntity.print();

// export default ECS;