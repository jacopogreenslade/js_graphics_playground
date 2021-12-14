// File for generating particle system

let ps;

function setup() {
    createCanvas(400,400);
    console.log("asdfasdf")
    ps = new ParticleSystem;
}

let stop = 250;
function draw() {
    background(220);
    if (stop<0){
        ps = new ParticleSystem(200);
        stop = 250;
    }

    ps.run()
    stop--;
}

class ParticleSystem { 
    constructor(amount) { 
        this.amount = amount;
        this.particles = [];

        for (let i=0; i < amount; i++) {
            this.particles.push(new Particle(new PVector(200,200)))
        }
    }

    update() {
        this.particles.forEach(p => {p.update(); });
    }

    display() {
        this.particles.forEach(p=> {p.display(); });
    }

    run() {
        this.update();
        this.display();
    }
}


class PVector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.y += vector.y;
        this.x += vector.x; 
    }
}

class Particle { 
    constructor(locationVector) {
        this.location = locationVector;
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector((Math.random()*0.2) - 0.05, (Math.random() * 0.2) - 0.05);
    }
    // lifespan;
    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
    //    lifespan -= 2.0;
    }

    display() {
        stroke(0); //lifespan));
        fill(color(259, 0, 0));//175, lifespan));
        ellipse(this.location.x, this.location.y, 8, 8);
    }
}
