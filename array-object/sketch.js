// Array and Object Notation
// Steven Qiu
// March 5, 2026
//
// Extra for Experts:
// - learned about classes

let playerX;
let playerY;
let playerWidth = 30;
let playerHeight = 30;
const PLAYER_SPD = 5;
let playerAngle;

let playerBullets = [];
let zombies = [];



class Bullet {
  // constructor seems to only be called one time, when the class is initally created
  // variables are taken from player angle + position (x, y, angle)
  constructor(x, y, angle){
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 20;
    this.size = 10;
  }

  draw() {
    push();
    noStroke();
    fill(220, 220, 0);
    circle(this.x, this.y, this.size);
    pop();
  }

  update(){
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }
}

class Zombie {
  constructor(){
    this.spd = 2;
    this.y;
    this.x;
    this.size = 30;

    // custom stuff separate from tutorial
    this.angle = 0;
    // custom

    // sets random position for zombie in borders
    if (random(1) < 0.5){
      this.y = random(-height/2, 0);
    }
    else {
      this.y = random(height, height * (3/2));
    }

    if (random(1) < 0.5){
      this.x = random(-width/2, 0);
    }
    else {
      this.x = random(width, width * (3/2));
    }

    //this.pos = createVector(this.x, this.y);
    console.log(this.x, this.y);
  }

  draw(){
    push();
    // custom
    translate(this.x, this.y);
    this.angle = atan2(playerY - this.y, playerX - this.x);
    // custom
    fill(100, 255, 100);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, this.size);
    pop();
  }

  update(){
    this.x += this.spd * cos(this.angle);
    this.y += this.spd * sin(this.angle);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  playerX = width/2;
  playerY = height/2;
}

function draw() {
  background(90);

  displayPlayer();
  playerMovement();

  bulletBehavior();

  spawnZombie();
  zombieBehavior();
}



// draws player
function displayPlayer(){
  // push() pop() seem to 'isolate' a few values for calculation of sorts. push() takes it out while pop() puts it back with the rest of the stuff

  // useful for rotating stuff, as rotate() rotates things from the origin, so by using push() pop() 
  // you can move around the origin with translate() without affecting any of the other components
  push();
  // you still use xy variables while using translate. While this section will see the origin as (playerX, playerY), all of the other code will still see it as (0, 0), and 
  // the playerX playerY variables as the player's position on the graph
  translate(playerX, playerY);
  // atan2 seems to give the angle vector between 2 points (at least when a subtraction is placed between the two)
  // x1 y1 are the first point, x2 y2 are the point we are comparing the first to
  // y's are put in first argument
  playerAngle = atan2(mouseY - playerY, mouseX - playerX);
  fill(0);
  rotate(playerAngle);
  rectMode(CENTER);
  // xy of rect() is (0,0) since we're moving the origin around as the the playerX playerY
  // its xy's are still basically playerX playerY
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
function mousePressed(){
  spawnBullet();
}

// display the bullets
function bulletBehavior(){
  for (let bullet of playerBullets){
    bullet.update();
    bullet.draw();
  }
}

// place bullet class into a list
// new [Class] creates the class. Variables are for constructor
function spawnBullet(){
  playerBullets.push(new Bullet(playerX, playerY, playerAngle));
}

function hasShotZombie(zombieHit){
  for (let i = 0; i < playerBullets.length; i++){
    // dist calculates distance from two points
    if (dist(playerBullets[i].x, playerBullets[i].y, zombieHit.x, zombieHit.y) < 25){
      playerBullets.splice(i, 1);
      return true;
    }
  }
  return false;
}



function spawnZombie(){
  if (frameCount % 60 === 0){
    zombies.push(new Zombie());
    console.log("created zombie");
  }
}

function zombieBehavior(){
  // aparentely done in reverse to not mess up indexes
  for (let i = zombies.length - 1; i >= 0; i--){
    zombies[i].update();
    zombies[i].draw();

    if (hasShotZombie(zombies[i])){
      console.log("hit");
      zombies.splice(i, 1);
    }
  }
}