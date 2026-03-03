// Ball Array

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  noStroke;

  for (let ball of ballArray){
    // move
    ball.x += ball.dx;
    ball.y += ball.dy;

    //display
    noStroke();
    fill(ball.r, ball.g, ball.b);
    circle(ball.x, ball.y, ball.radius * 2);

    if (ball.x < ball.radius || ball.x > width - ball.radius){
      ball.dx *= -1;
    }
    if (ball.y < ball.radius || ball.y > height - ball.radius){
      ball.dy *= -1;
    }
  }
}

function mousePressed(){
  spawnBall();
}

function spawnBall(){
  let theBall = {
    x: random(width),
    y: random(height),
    dx: random(-5, 5),
    dy: random (-5, 5),
    radius: random(10, 40),
    
    r: random(255),
    g: random(255),
    b: random(255),
  };
  ballArray.push(theBall);
}