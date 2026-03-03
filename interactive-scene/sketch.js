// Interactive Scene
// Steven Qiu
// Date March 2, 2026
//
// Extra for Experts:
// - entire game is scallable based on window size (though must be reloaded/restarted for it to be scalled mid-game)
// - added in and uploaded custom font

// game state/UI variables
let gameState = "game"; // game, end
let score1 = 0;
let score2 = 0;
let scoreFontSize;
let restartButtonText = "Click to Replay";
let customFont;

// player variables
let paddleWidth;
let paddleHeight;
let paddleSpd;

let player1X;
let player1Y;
let player2X;
let player2Y;

// ball variables
let ballX;
let ballY;
let ballStartingSpd;
let ballDX;
let ballDY;
let radius;
let ballSpdUpAmount;
let maxBallSpd;

// when either player reaches this score, the game ends
let endScore = 12;



// preload assets
function preload() {
  customFont = loadFont("Pixelify_Sans/PixelifySans-VariableFont_wght.ttf");
}

// sets up game, and resets it when called again in endScreen function
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
  ballDX = ballStartingSpd;
  ballDY = ballStartingSpd;
  maxBallSpd = ballStartingSpd * 3;
  ballSpdUpAmount = ballStartingSpd / 25;

  radius = sqrt(width * height)/100;

  textFont(customFont);
  scoreFontSize = sqrt(width * height)/20;
}



// runs game, calling main functions
function draw() {
  background(0);
  
  mainGame();
  displayPlayers();
  timerEndingGame();

  endScreen();
}

// controls:
// - game state
// - paddles
// - player movement
// - ball physics
// - UI
function mainGame() {
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

// controls what happens once the game ends
// allows you to restart the game, and shows who won
function endScreen() {
  let restartButtonWidth = width / 4;
  let restartButtonHeight = height / 8;
  let endScreenText;


  if (gameState === "end") {
    text(restartButtonText, width / 2 - scoreFontSize/4.5 * restartButtonText.length, height * (3/4));

    if (score1 > score2){
      endScreenText = "Player 1 Wins!";
      text(endScreenText, width / 4 - scoreFontSize/4 * endScreenText.length, height / 8);
    }
    else if (score2 > score1){
      endScreenText = "Player 2 Wins!";
      text(endScreenText, width * (3/4) - scoreFontSize/4 * endScreenText.length, height / 8);
    }

    if (mouseX > width/2 - restartButtonWidth && mouseX < width/2 + restartButtonWidth &&
      mouseY > height * (3/4) - restartButtonHeight/2 && mouseY < height * (3/4) + restartButtonWidth / 8 && mouseIsPressed) {
      setup();
      resetGame();
    }
  }
}



// draws paddles
function displayPlayers(){
  noStroke();
  fill(255);
  rect(player1X, player1Y, paddleWidth, paddleHeight);
  rect(player2X, player2Y, paddleWidth, paddleHeight);
}

// controls movement of both players
function playerMovement(){
  // player1 movement (WASD)
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
  
  // player2 movement (ARROW keys)
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



// draws the ball
function displayBall(){
  noStroke();
  fill(255);
  circle(ballX, ballY, radius * 2);
}

// controls movement of the ball
function ballMove(){
  ballX += ballDX;
  ballY += ballDY;
}

// controls ball bouncing off the ceiling/floor and players scoring
function ballBounce(){

  if (ballY > height - radius || ballY < radius){ // bounce off ceiling/floor
    ballDY *= -1;
    accelerateBall();
  }
  
  // score for player 1
  if (ballX > width + radius){
    resetBall();
    score1 += 1;
  }

  // score for player 2
  if (ballX < 0 - radius){
    resetBall();
    score2 += 1;
  }
}

// when ball collides with the paddles
function ballCollide(){ 
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

// causes the ball to speed up when it hits the ceiling, floor, or paddles
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

// places the ball in its starting position when the scene is initially loaded, when a point is scored, and when the game is restarted
function resetBall() {
  ballX = windowWidth/2;
  ballY = windowHeight/18;
  ballDX = ballStartingSpd;
  ballDY = ballStartingSpd;

  if (ballDY < 0) {
    ballDY *= -1;
  }
}



// creates dotted line in center of screen
// - uses for loop
function centerLine(){
  for (let i = 0; i < height/5 + 3; i++){
    rect(width/2, height/100 * i * 5, width/300, height/40);
  }
}

// draws score UI for both players
function drawScore(){
  textSize(scoreFontSize);
  text(score1, width/2 - (width/30 + scoreFontSize/2 * String(score1).length), height/2); // player 1 score
  text(score2, width/2 + width/30, height/2); // player 2 score
}

// causes the game to end once either player reaches the end score
function timerEndingGame() {
  if (score1 === endScore || score2 === endScore) {
    gameState = "end";
  }
}

// resets score of players and gamestate once the game is restarted
function resetGame(){
  score1 = 0;
  score2 = 0;
  gameState = "game";
}