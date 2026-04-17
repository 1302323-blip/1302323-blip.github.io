// Collision Ball OOP Demo

class Ball {
  constructor(_x, _y){
    this.x = _x;
    this.y = _y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);

    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.radius = random(15, 40);
  }

  display(){
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius * 2);
  }

  move(){
    this.x += this.dx;
    this.y += this.dy;

    // check top/bottom to bounce
    if (this.y < this.radius || this.y > height - this.radius){
      this.dy *= -1;
    }

    // check walls to bounce
    if (this.x < this.radius || this.x > width - this.radius){
      this.dx *= -1;
    }
  }

  bounceOff(otherBall){
    let radiusSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    
    if (distanceApart < radiusSum){
      // collision occured
      let tempDX = this.dx;
      let tempDY = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;

      otherBall.dx = tempDX;
      otherBall.dy = tempDY;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let ball of ballArray){
    ball.display();
    ball.move();
    
    for (let otherBall of ballArray){
      if (ball !== otherBall){
        ball.bounceOff(otherBall);
      }
    }
  }
}

function mousePressed(){
  ballArray.push(new Ball(mouseX, mouseY));
}