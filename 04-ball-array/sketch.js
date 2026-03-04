// Ball Array

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  noStroke;

  for (let ball of ballArray){
    // move
    ball.x += ball.dx;
    ball.y += ball.dy;

    //display
    noStroke();
    fill(ball.r, ball.g, ball.b);
    circle(ball.x, ball.y, ball.radius * 2);

    // teleport to other side
    if (ball.x < -ball.radius){
      ball.x = width + ball.radius;
    }
    if (ball.x > width + ball.radius){
      ball.x = -ball.radius;
    }

    if (ball.y < -ball.radius){
      ball.y = height + ball.radius;
    }
    if (ball.y > height + ball.radius){
      ball.y = -ball.radius;
    }
    // ball.gravity += 1;
    // if (ball.y < height - ball.radius){
    //   ball.y = height - ball.radius;
    //   ball.gravity = 0 - ball.jumpStrength;
    //   ball.jumpStrength *= 0.9;
    // }
  }
}

function mousePressed(){
  spawnBall(mouseX, mouseY);
}

function spawnBall(_x, _y){
  let theBall = {
    x: _x,
    y: _y,
    dx: random(-5, 5),
    dy: random (-5, 5),
    radius: random(10, 40),
    
    r: random(255),
    g: random(255),
    b: random(255),

    gravity: 0,
    jumpStrength: (height - _y) / 200,
  };
  ballArray.push(theBall);
}

