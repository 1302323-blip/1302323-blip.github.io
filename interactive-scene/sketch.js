// Interactive Scene
// Steven Qiu
// Date
//
// Extra for Experts:
// - entire game is scallable based on window size (though must be reloaded)
// - added in and uploaded custom font [[[[NOT ACTUALLY DONE YET]]]]

let gameState = "game"; // game, start, end
let score1 = 0;
let score2 = 0;
let scoreFontSize;
let endScreenFontSize;

let paddleWidth;
let paddleHeight;
let paddleSpd;

let player1X;
let player1Y;
let player2X;
let player2Y;

let ballX;
let ballY;
let ballStartingSpd;
let ballDX;
let ballDY;
let radius;
let ballSpdUpAmount;
let maxBallSpd;

// temporary variables
let endScore = 10;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  paddleWidth = width/100;
  paddleHeight = height/7;
  paddleSpd = height/70;
  
  player1X = windowWidth/12;
  player1Y = windowHeight/2 - paddleHeight/2;
  player2X = windowWidth - windowWidth/12;
  player2Y = windowHeight/2 - paddleHeight/2;
  
  resetBall();
  ballStartingSpd = sqrt(width * height)/200;
  maxBallSpd = ballStartingSpd * 3;
  ballSpdUpAmount = ballStartingSpd / 50;
  ballDX = ballStartingSpd;
  ballDY = ballStartingSpd;
  radius = sqrt(width * height)/100;

  scoreFontSize = sqrt(width * height)/20;
  endScreenFontSize;
}



function draw() {
  background(0);
  
  mainGame();
  displayPlayers();
  timerEndingGame();

  endScreen();
}

// controls actual gameplay when called
function mainGame() {
  if (gameState !== "start"){
    if (gameState !== "end"){
      displayBall();
      playerMovement();
      ballMove();
      ballBounce();
      ballCollide();
    }
    
    centerLine();
    drawScore();
  }
}

// screen that starts the game
function startScreen() {

}

// should draw box saying who won, and a button that asks if you wanna restart
function endScreen() {
  let endScreenWidth = width / 2;
  let endScreenHeight = height / 4;
  let endScreenText;
  let winningScore;

  if (gameState === "end") {
    // fill("white");
    // rect(width/2 - endScreenWidth/2, height/2 - endScreenHeight/2, endScreenWidth, endScreenHeight);

    if (score1 > score2){
      endScreenText = "Player 1 Wins!";
    }
    else if (score2 < score1){
      endScreenText = "Player 2 Wins!";
    }

    // fill(0);
    // textSize(scoreFontSize);
    // text(endScreenText, width/2 - (width/30 + scoreFontSize/2 * endScreenText.length), height/2);
  }
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
    player2Y = 0;
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

  if (ballY > height - radius || ballY < radius){ // bounce off ceiling/floor
    ballDY *= -1;
    accelerateBall();
  }
  
  // score for player 1
  if (ballX > width + radius){
    resetBall();
    score1 += 1;
    console.log("player1 score: " + score1);
    
  }

  // score for player 2
  if (ballX < radius){
    resetBall();
    score2 += 1;
    console.log("player2 score: " + score2);
  }
}

function ballCollide(){ // when ball collides with the paddles
  //collide with player 1
  if (ballX > player1X && ballX < player1X + paddleWidth&& 
      ballY > player1Y && ballY < player1Y + paddleHeight){
    ballX = player1X + paddleWidth*1.5;
    ballDX *= -1;
    accelerateBall();
  }
  
  // collide with player 2
  else if (ballX > player2X && ballX < player2X + paddleWidth && 
      ballY > player2Y && ballY < player2Y + paddleHeight){
    ballX = player2X - paddleWidth*1.5;
    ballDX *= -1;
    accelerateBall();
  }
}

function accelerateBall() {
  if (ballDX < 0) {
    ballDX -= ballSpdUpAmount;
  }
  else if (ballDX > 0){
    ballDX += ballSpdUpAmount;
  }
  if (ballDY < 0) {
    ballDY -= ballSpdUpAmount;
  }
  else if (ballDY > 0) {
    ballDY += ballSpdUpAmount;
  }

  if (ballDX > maxBallSpd) {
    ballDX = maxBallSpd;
  }
  else if (ballDX < maxBallSpd * -1) {
    ballDX = maxBallSpd * -1;
  }
  if (ballDY > maxBallSpd) {
    ballDY = maxBallSpd;
  }
  else if (ballDY < maxBallSpd * -1) {
    ballDY = maxBallSpd * -1;
  }
}

function resetBall() {
  ballX = windowWidth/2;
  ballY = windowHeight/18;

  if (ballDY < 0) {
    ballDY *= -1;
  }
}



function centerLine(){
  for (let i = 0; i < height/5 + 3; i++){
    rect(width/2, height/100 * i * 5, width/300, height/40);
  }
}

function drawScore(){
  textSize(scoreFontSize);
  text(score1, width/2 - (width/30 + scoreFontSize/2 * String(score1).length), height/2);
  text(score2, width/2 + width/30, height/2);
}

function timerEndingGame() {
  if (score1 === endScore || score2 === endScore) {
    gameState = "end";
  }
}