// Array and Object Notation
// Steven Qiu
// March 5, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//
// 

let playerX;
let playerY;
let playerWidth = 50;
let playerHeight = 50;
const PLAYER_SPD = 5;
let playerAngle;

let playerBullets = [];

class Bullet {
  constructor(x, y, angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 12;
    this.size = 10;

    console.log(this.x, this.y);
  }

  draw() {
    push();
    noStroke();
    fill(200, 150, 0);
    circle(this.x, this.y, this.size);
    pop();
  }

  update(){
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  playerX = width/2;
  playerY = height/2;
}

function draw() {
  background(220);

  displayPlayer();
  playerMovement();

  bulletBehavior();
}

// draws player
function displayPlayer(){
  push();
  translate(playerX, playerY);
  playerAngle = atan2(mouseY - playerY, mouseX - playerX);
  fill(0);
  rotate(playerAngle);
  rectMode(CENTER);
  rect(0, 0, playerWidth, playerHeight);
  pop();
}

// player movement
function playerMovement(){
  if (keyIsDown(87) || keyIsDown(38)){ // up
    playerY -= PLAYER_SPD;
  }
  if (keyIsDown(83) || keyIsDown(40)){ // down
    playerY += PLAYER_SPD;
  }
  if (keyIsDown(65) || keyIsDown(37)){ // left
    playerX -= PLAYER_SPD;
  }
  if (keyIsDown(68) || keyIsDown(39)){ // right
    playerX += PLAYER_SPD;
  }
}



// shoot a bullet
// function shootBullets(){
//   if (mouseIsPressed)
// }

function mousePressed(){
  spawnBullet();
}

// display the bullets
function bulletBehavior(){
  for (let bullet of playerBullets){
    // push();
    // translate(bullet.x, bullet.y);
    // fill(0);
    // circle(bullet.x, bullet.y, bullet.size);
    // pop();
    
    // bullet.x = cos(bullet.angle) * bullet.spd;
    // bullet.y = sin(bullet.angle) * bullet.spd;

    // bullet.x += bullet.dx;
    // bullet.x += bullet.dy;
    bullet.update();
    bullet.draw();
  }
}

// player bullets
function spawnBullet(){
  // let theBullet = {
  //   x: _x,
  //   y: _y,
  //   spd: 2,
  //   angle: atan2(mouseY - _y, mouseX - _x),
  //   size: 5,
  // };
  // playerBullets.push(theBullet);
  // console.log(theBullet.angle);

  playerBullets.push(new Bullet(playerX, playerY, playerAngle));
}