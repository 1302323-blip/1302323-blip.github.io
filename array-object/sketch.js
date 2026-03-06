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



function setup() {
  createCanvas(windowWidth, windowHeight);

  playerX = width/2;
  playerY = height/2;
}

function draw() {
  background(220);

  displayPlayer();
  playerMovement();
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



// player bullets
function spawnBullet(_x, _y){
  let bullet = {
    x: _x,
    y: _y,
    dx: 0,
    dy: 0,
    spd: 10,
    angle: atan2(mouseY - _y, mouseX - _x),
    width: 10,
    height: 40,
  };
}