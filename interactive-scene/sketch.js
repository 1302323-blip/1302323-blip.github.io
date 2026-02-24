// Interactive Scene
// Steven Qiu
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = ""; // not needed rn
let score1 = 0;
let score2 = 0;
let waitTime = 2000;
let fontSize = 30;

let paddleWidth;
let paddleHeight;
let paddleSpd = 7;

let player1X;
let player1Y;
let player2X;
let player2Y;

let ballSpeed = 4;
let ballX;
let ballY;
let ballDX = 5;
let ballDY = -5;
let radius = 10



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  paddleWidth = width/100;
  paddleHeight = height/7;
  
  player1X = windowWidth/12;
  player1Y = windowHeight/2 - paddleHeight/2;
  player2X = windowWidth - windowWidth/12;
  player2Y = windowHeight/2 - paddleHeight/2;
  
  ballX = windowWidth/2;
  ballY = windowHeight/2;
}



function draw() {
  background(0);
  
  displayPlayers();
  playerMovement();
  
  displayBall();
  ballMove();
  ballBounce();
  ballCollide();
  
  centerLine();
  drawScore();
}



function displayPlayers(){
  noStroke();
  fill(255);
  rect(player1X, player1Y, paddleWidth, paddleHeight);
  rect(player2X, player2Y, paddleWidth, paddleHeight);
}

function playerMovement(){
  // player1 movement
  if (keyIsDown(87)){
    player1Y -= paddleSpd;
  }
  if (keyIsDown(83)){
    player1Y += paddleSpd;
  }
  
  if (player1Y < 0){
    player1Y = 0;
  }
  if (player1Y > height - paddleHeight){
    player1Y = height - paddleHeight;
  }
  
  // player2 movement
  if (keyIsDown(38)){
    player2Y -= paddleSpd;
  }
  if (keyIsDown(40)){
    player2Y += paddleSpd;
  }
  
  if (player2Y < 0){
    player1Y = 0;
  }
  if (player2Y > height - paddleHeight){
    player2Y = height - paddleHeight;
  }
}



function displayBall(){
  noStroke();
  fill(255);
  circle(ballX, ballY, radius * 2);
}

function ballMove(){
  ballX += ballDX;
  ballY += ballDY;
}

function ballBounce(){ // when ball colides with walls/ceilings
  // if (ballX > width - radius || ballX < radius){ // would make it bounce off walls
  //   ballDX *= -1;
  // }
  if (ballY > height - radius || ballY < radius){ // bounce off ceiling/floor
    ballDY *= -1;
  }
  
  if (ballX > width + radius){
    ballX = width/2;
    ballY = height/2;
    score1 += 1;
    console.log("player1 score: " + score1);
    
  }
  if (ballX < radius){
    ballX = width/2;
    ballY = height/2;
    score2 += 1;
    console.log("player2 score: " + score2);
  }
}

function ballCollide(){ // when ball collides with the paddles
  //collide with player 1
  if (ballX > player1X && ballX < player1X + paddleWidth && 
      ballY > player1Y && ballY < player1Y + paddleHeight){
    ballX = player1X + paddleWidth;
    ballDX *= -1;
  }
  
  else if (ballX > player2X && ballX < player2X + paddleWidth && 
      ballY > player2Y && ballY < player2Y + paddleHeight){
    ballX = player2X - paddleWidth;
    ballDX *= -1;
  }
}



function centerLine(){
  for (let i = 0; i < height/5 + 3; i++){
    rect(width/2, height/100 * i * 5, width/300, height/40)
  }
}

function drawScore(){
  textSize(fontSize)
  text(score1, width/2 - (width/30 + fontSize/2 * (String(score1).length)), height/2)
  text(score2, width/2 + width/30, height/2)
}