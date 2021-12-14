// File for generating particle system

let ps;

function setup() {
    createCanvas(400,400);

    ps = new ParticleSystem(200);
}

// let stop = 250;
function draw() {
    background(220);
    ps.run();
    // console.log('asdfasdfadfsaasdfasdf')
    // stop--;
}

class ParticleSystem { 
    constructor(amount) { 
        this.amount = amount;
        this.particles = [];

        // for (let i=0; i < amount; i++) {
        //     this.particles.push(new Particle(new PVector(200,200)))
        // }
        this.particles.push(new Particle(new PVector(200,200)));

    }

    update() {
        if (this.particles.length < this.amount) {
            console.log("add particle")
            this.particles.push(new Particle(new PVector(200,200)));
        }
        this.particles = this.particles.map((p, i) => {
          p.update();
          if (p.isDead()) {
            return new Particle(new PVector(200,200))
          }
          return p;
        }) 
    }

    display() {
        this.particles.forEach(p => {p.display(); });
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
        this.acceleration = new PVector((Math.random()*0.1) - 0.05, (Math.random() * 0.1) - 0.05);
        this.lifespan = 50;
    }
    // lifespan;
    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.lifespace -= 1.0;
    //    lifespan -= 2.0;
    }

    display() {
        stroke(0); //lifespan));
        fill(color(255, 0, 0));//175, lifespan));
        ellipse(this.location.x, this.location.y, 8, 8);
    }

    isDead() {
      if (this.lifespan <= 0.0) {
        return true; 
      } {
        return false;
      }
      
    }
}









