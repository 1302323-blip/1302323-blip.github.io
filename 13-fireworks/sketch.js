// Fireworks OOP demo

class Particle {
  constructor(_x, _y){
    this.x = _x;
    this.y = _y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 3;

    this.r = 255;
    this.g = 0;
    this.b = 0;

    this.opacity = 255;
  }

  display(){
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius * 2);
  }

  update(){
    // move particles
    this.x += this.dx;
    this.y += this.dy;

    // fade away over time
    this.opacity -= 2;
  }
}

let fireworks = [];
const PARTICLES_PER_CLICK = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let firework of fireworks){
    firework.update();
    firework.display();
  }
}

function mousePressed(){
  for (let i = 0; i < PARTICLES_PER_CLICK; i++){
    let newFirework = new Particle(mouseX, mouseY);
    fireworks.push(newFirework);
  }
}