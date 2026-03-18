// Array and Object Notation
// Steven Qiu
// March 5, 2026
//
// Extra for Experts:
// - learned about classes
// - learned how to extend classes

// disclaimer: lots of the comments made are mainly for my own learning

// player stats
let playerX;
let playerY;
let playerWidth = 30;
let playerHeight = 30;
const PLAYER_SPD = 5;
let playerAngle;

let lastTimeShot = 0;

const PLAYER_MAX_HEALTH = 3;
let playerHealth;

// lists
let playerBullets = [];
let zombies = [];

// main game stuff
let gameState = "playing"; // playing, end
let score;
let scoreTextSize = 50;

// zombie spawn times
// don't really work for some reason with the spawnZombie() function

// let zombieSpawnTime = 180;
// let fastZombieSpawnTime = zombieSpawnTime * 6;
// let toughZombieSpawnTime = zombieSpawnTime * 12;
// let spawnTimeReduction = 0.5;


// the bullets of the player
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


// the zombies + variants

// if you wanted to make different types of zombies, you'd just create a new class of a different zombie type
class Zombie {
  constructor(){
    this.spd = 2;
    this.y;
    this.x;
    this.size = 30;
    this.health = 2;
    this.damage = 1;

    this.givenScore = 15;

    this.angle = 0;
    this.colour = color(100, 250, 100);

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
  }

  draw(){
    push();
    translate(this.x, this.y);
    this.angle = atan2(playerY - this.y, playerX - this.x);
    //fill(100, 255, 100);
    fill(this.colour);
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

// extending classes allows you to create a new entity using the code of another class
// seems to only use constructor
class fastZombie extends Zombie{
  constructor() {
    // super() is needed to extend classes
    super();
    this.spd = 5;
    this.y;
    this.x;
    this.size = 25;
    this.health = 1;
    this.damage = 1;
    this.givenScore = 25;

    this.angle = 0;
    this.colour = color(255, 0, 0);

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
  }
}

class toughZombie extends Zombie{
  constructor() {
    super();
    this.spd = 1.2;
    this.y;
    this.x;
    this.size = 45;
    this.health = 10;
    this.damage = 3;
    this.givenScore = 100;

    this.angle = 0;
    this.colour = color(109, 36, 191);

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
  }
}


// setup and draw functions
function setup() {
  createCanvas(windowWidth, windowHeight);

  resetGame();
}

function draw() {
  background(90);
  
  zombieBehavior();
  displayScore();
  
  if (gameState === "playing"){

    displayPlayer();
    playerMovement();

    shootBullets();
    bulletBehavior();

    spawnZombie();

    if (playerHealth <= 0){
      gameState = "end";
    }
  }

  // instantly resets game when it ends
  if (gameState === "end"){
    resetGame();
  }
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

  if (playerX < 0){
    playerX = 0;
  }
  if (playerX > width){
    playerX = width;
  }
  if (playerY < 0){
    playerY = 0;
  }
  if (playerY > height){
    playerY = height;
  }
}

// reset game once gameState = "end"
function resetGame(){
  playerX = width/2;
  playerY = height/2;
  playerHealth = PLAYER_MAX_HEALTH;
  gameState = "playing";

  zombies.splice(0, zombies.length);
  playerBullets.splice(0, playerBullets.length);
  frameCount = 0;

  score = 0;
  frameCount = 1;
}



// shoot a bullet when mouse is pressed
// hold to shoot bullets automatically
function shootBullets(){
  const FIRING_TIME = 150;

  if (mouseIsPressed && lastTimeShot < millis()){
    lastTimeShot = millis() + FIRING_TIME;
    spawnBullet();
  }
}

// display the bullets
function bulletBehavior(){
  //for (let bullet of playerBullets){
  for (let i = playerBullets.length - 1; i >= 0; i--){
    // takes a bullet from a list, which is assigned to a newly created class 'Bullet'
    // doing this we can call the update() and draw() functions from the class 'Bullet'
    playerBullets[i].update();
    playerBullets[i].draw();

    if (bulletOffscreen(playerBullets[i])){
      playerBullets.splice(i, 1);
    }
  }
}

// deletes bullets when they're offscrean
function bulletOffscreen(bullet){
  if (bullet.x < -bullet.size/2){
    return true;
  }
  if (bullet.x > width + bullet.size/2){
    return true;
  }
  if (bullet.y < -bullet.size/2){
    return true;
  }
  if (bullet.y > height + bullet.size){
    return true;
  }
  return false;
}

// creates bullets when shot; places bullet class into the list
// new [Class] creates the class. Variables are for constructor
function spawnBullet(){
  playerBullets.push(new Bullet(playerX, playerY, playerAngle));
}

// damage zombies when hit with bullet
// kills zombie when they run out of health
function hasShotZombie(zombieHit){
  // each 'bullet' class (which is assigned to a variable) will be checked if it hit a zombie gotten from 'zombieHit'
  // we can get the xy values of each class still using the indexs of each one we get from their for loops
  for (let i = 0; i < playerBullets.length; i++){
    // dist calculates distance from two points
    if (dist(playerBullets[i].x, playerBullets[i].y, zombieHit.x, zombieHit.y) < zombieHit.size * 0.8){
      playerBullets.splice(i, 1);
      // if true, we kill/hit the zombie
      return true;
    }
  }
  return false;
}


// soawns the zombies
// uses frameCount as timer

// this version of the spawnZombie() function seems to break a lot

// function spawnZombie(){
//   if (frameCount % round(zombieSpawnTime) === 0){ //60
//     zombies.push(new Zombie());
//     zombieSpawnTime -= spawnTimeReduction;
//   }
//   if (frameCount % round(fastZombieSpawnTime) === 0){ //180
//     zombies.push(new fastZombie());
//     fastZombieSpawnTime -= spawnTimeReduction*2;
//   }
//   if (frameCount % round(toughZombieSpawnTime) === 0){ //480
//     zombies.push(new toughZombie());
//     toughZombieSpawnTime -= spawnTimeReduction*4;
//   }

//   if (zombieSpawnTime < 20){
//     zombieSpawnTime = 20;
//   }
//   if (fastZombieSpawnTime < 40){
//     fastZombieSpawnTime = 40;
//   }
//   if (toughZombieSpawnTime < 80){
//     toughZombieSpawnTime = 80;
//   }
// }

// this version of the spawnZombie() function seems to work fine
function spawnZombie(){
  if (frameCount % 60 === 0){
    zombies.push(new Zombie());
  }
  if (frameCount % 180 === 0){
    zombies.push(new fastZombie());
  }
  if (frameCount % 480 === 0){ 
    zombies.push(new toughZombie());
  }
}

// when zombie damages the player

// unsure how to solve error
// - bitingZombie.x is at times undefined, which causes the code to break, but when the zombie gets shot, not when it bits the player
// - seems to caused by when I try to speed up the rates the zombies spawn overtime
// - not sure why
function zombieBitPlayer(bitingZombie){
  if (dist(bitingZombie.x, bitingZombie.y, playerX, playerY) < bitingZombie.size/2){
    playerHealth -= bitingZombie.damage;
    console.log(playerHealth);
    return true;
  }
  return false;
}

// allows zombies to move, display, get damaged, etc.
function zombieBehavior(){
  // aparentely done in reverse to not mess up indexes
  for (let i = zombies.length - 1; i >= 0; i--){
    if (gameState === "playing"){
      zombies[i].update();
    }
    zombies[i].draw();

    // each zombie id checks if its hit a bullet using this if function in the for loop
    if (hasShotZombie(zombies[i])){
      // gets rid of one zombie in the list
      // ie. the zombie actually hit by the bullet
      zombies[i].health -= 1;
      if (zombies[i].health <= 0){
        score += zombies[i].givenScore;
        zombies.splice(i, 1);
      }
    }

    if (zombieBitPlayer(zombies[i])){
      zombies.splice(i, 1);
    }
  }
}

// displays score
function displayScore(){
  textSize(scoreTextSize);
  fill(0);
  text(score, width/2 - scoreTextSize/4 * String(score).length, height/2);
}