// Grid Based Game (checkers)
// Steven Qiu
// March 23, 2026
//
// Extra for Experts:
// - added sound effects & music

const GRID_DIMENSIONS = 8;
const BLACK_TILE = 1;
const WHITE_TILE = 0;

// location of pieces
const EMPTY_SPACE = 0;
const WHITE_IN_SPACE = 1;
const BLACK_IN_SPACE = 2;

// rows that turn pieces into kings
const BLACK_PROMOTE_ROW = 7;
const WHITE_PROMOTE_ROW = 0;

let cellSize;
let grid;
let pieceGrid; // identical grid that contains the pieces/units
let gridStartingX;
let gridStartingY;

let pieces = [];

// (sort of) state related variables
let selectedPieceID = null;
let playerTurn = "white";

let gameState = "playing"; // playing, finished
let winner = null;

// sound effects/music
let movePieceSFX;
let promotePieceSFX;
let caputurePieceSFX;

let gameMusic;

let customFontSize;



// intially loads sound effects & music
function preload(){
  movePieceSFX = loadSound("SFX/sound_click.wav");
  caputurePieceSFX = loadSound("SFX/qubodup-crash.ogg");
  promotePieceSFX = loadSound("SFX/Picked Coin Echo.wav");

  gameMusic = loadSound("SFX/TheLoomingBattle.OGG");
}



class CheckerPiece {
  constructor(_x, _y, teamColour){
    this.x = _x;
    this.y = _y;
    this.team = teamColour; // only black and white teams
    this.radius = cellSize * 3/4;

    this.isKing = false;
    this.stayAsKing = false;

    this.centerOfCellX = cellSize/2;
    this.centerOfCellY = cellSize/2;
  }

  display(){
    let promotedSymbolSize = 2.5;

    stroke("black");
    fill(this.team);
    circle(this.x * cellSize + this.centerOfCellX + gridStartingX, this.y * cellSize + this.centerOfCellY + gridStartingY, this.radius);
    if (this.isKing){
      if (this.team === "white"){
        fill("black");
        circle(this.x * cellSize + this.centerOfCellX + gridStartingX, this.y * cellSize + this.centerOfCellY + gridStartingY, this.radius / promotedSymbolSize);
      }
      if (this.team === "black"){
        fill("white");
        circle(this.x * cellSize + this.centerOfCellX + gridStartingX, this.y * cellSize + this.centerOfCellY + gridStartingY, this.radius / promotedSymbolSize);
      }
    }
  }

  // handles & checks if a piece is to be promoted, + keeps them promoted
  promoting(){
    if (this.team === "white"){
      if (!this.stayAsKing && this.y === WHITE_PROMOTE_ROW){
        promotePieceSFX.play();
      }
      if (this.stayAsKing || this.y === WHITE_PROMOTE_ROW){
        this.isKing = true;
        this.stayAsKing = true;
      }
      
    }

    if (this.team === "black"){
      if (!this.stayAsKing && this.y === BLACK_PROMOTE_ROW){
        promotePieceSFX.play();
      }
      if (this.stayAsKing || this.y === BLACK_PROMOTE_ROW){
        this.isKing = true;
        this.stayAsKing = true;
      }
    }
  }
}



// initially generates board & starts playing/looping music
function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();
}

// draws board, displays pieces, tracks the pieces' positions
function draw() {
  noStroke();
  background(220);

  displayGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
  managePieces();
  pieceGrid = trackingPiecesOnGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);

  stateMachine();
}



function displayGrid(cols, rows){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === WHITE_TILE){
        fill(234, 247, 215);
      }
      else if (grid[y][x] === BLACK_TILE){
        fill(134, 156, 102);
      }
      square(x * cellSize + gridStartingX, y * cellSize + gridStartingY, cellSize);
    }
  }
}

// generates checkers board in array (and that's it)
function generateGrid(cols, rows){
  let newGrid = [];
  let TileWasBlack = true;
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      if (TileWasBlack){
        newGrid[y].push(WHITE_TILE);
        TileWasBlack = !TileWasBlack;
      }
      else if (!TileWasBlack){
        newGrid[y].push(BLACK_TILE);
        TileWasBlack = !TileWasBlack;
      }
    }
    TileWasBlack = !TileWasBlack;
  } 
  return newGrid;
}



// performs functions in Pieces class
function managePieces(){
  for (let i = pieces.length - 1; i >= 0; i--){
    pieces[i].promoting();
    pieces[i].display();
  }
}

// initially generates pieces
function generatePieces(){
  // destroys existing pieces when game resets
  pieces.splice(0, pieces.length);

  // generates black pieces
  for (let y = 0; y <= 2; y++){
    for (let x = 0; x < GRID_DIMENSIONS; x++){
      if (grid[y][x] === BLACK_TILE){
        pieces.push(new CheckerPiece(x, y, "black"));
      }
    }
  }

  // generates white pieces
  for (let y = 5; y <= 7; y++){
    for (let x = 0; x < GRID_DIMENSIONS; x++){
      if (grid[y][x] === BLACK_TILE){
        pieces.push(new CheckerPiece(x, y, "white"));
      }
    }
  }
}

// tracks where the pieces are on the grid
// used for collision
function trackingPiecesOnGrid(cols, rows){
  let newGrid = [];
  
  for (let _y = 0; _y < rows; _y++){
    newGrid.push([]);

    for (let _x = 0; _x < cols; _x++){
      // is there a piece in this space
      newGrid[_y].push(EMPTY_SPACE);

      for (let piece of pieces){
        if (_x === piece.x && _y === piece.y){
          // which piece colour is it?
          if (piece.team === "white"){
            newGrid[_y][_x] = WHITE_IN_SPACE;
          }
          else if (piece.team === "black"){
            newGrid[_y][_x] = BLACK_IN_SPACE;
          }
          break;
        }
      }
    }
  }
  return newGrid;
}



// allows you to selected a piece to then make it move
function mousePressed(){
  if (gameState === "playing"){
    let x = Math.floor((mouseX - gridStartingX)/cellSize);
    let y = Math.floor((mouseY - gridStartingY)/cellSize);

    if (selectedPieceID === null){
      mousePieceCheck(x, y);
    }
    else if (selectedPieceID !== null){
      mouseMovePiece(x, y, selectedPieceID);
    }
  }
}

// checks if, when the mouse is clicked, a piece is there; selects that piece
function mousePieceCheck(_x, _y){
  selectedPieceID = null;

  if (_x >= 0 && _x < GRID_DIMENSIONS && _y >= 0 && _y < GRID_DIMENSIONS){
    for (let piece of pieces){
      // checks if its the turn of piece's team
      if (_x === piece.x && _y === piece.y && piece.team === playerTurn){
        selectedPieceID = piece;
      }
    }
  }
}

// allows you to move the piece after clicking it
// checks for collision (if you can move in that space), and if it can jump over an enemy piece
function mouseMovePiece(_x, _y, piece){
  let mouseXDistanceFromPiece = _x - piece.x;
  let mouseYDistanceFromPiece = _y - piece.y;

  // is there location you want to move to on the grid?
  if (_x >= 0 && _x < GRID_DIMENSIONS && _y >= 0 && _y < GRID_DIMENSIONS){
    // is there another piece on this square?
    if (pieceGrid[_y][_x] === EMPTY_SPACE){

      // is the piece a king?
      if (piece.isKing){
        if ((mouseYDistanceFromPiece === 1 || mouseYDistanceFromPiece === -1) && (mouseXDistanceFromPiece === 1 || mouseXDistanceFromPiece === -1)){
          piece.x = _x;
          piece.y = _y;
          changePlayerTurn();
        }

        // try to kill a piece

        // team is white; target is black
        // first detect if there's a black piece in the path
        else if (pieceGrid[piece.y + Math.floor(mouseYDistanceFromPiece/2)][piece.x + Math.floor(mouseXDistanceFromPiece/2)] === BLACK_IN_SPACE && piece.team === "white"){  
          // then check if the move is legal or not
          if ((mouseYDistanceFromPiece === -2 || mouseYDistanceFromPiece === 2) && (mouseXDistanceFromPiece === 2 || mouseXDistanceFromPiece === -2)){
            killPiece(piece.x + Math.floor(mouseXDistanceFromPiece/2), piece.y + Math.floor(mouseYDistanceFromPiece/2));
            piece.x = _x;
            piece.y = _y;
            changePlayerTurn();
          }
        }

        // team is black; target is white
        // first detect if there's a white piece in the path
        else if (pieceGrid[piece.y + Math.floor(mouseYDistanceFromPiece/2)][piece.x + Math.floor(mouseXDistanceFromPiece/2)] === WHITE_IN_SPACE && piece.team === "black"){  
          // then check if the move is legal or not
          if ((mouseYDistanceFromPiece === -2 || mouseYDistanceFromPiece === 2) && (mouseXDistanceFromPiece === 2 || mouseXDistanceFromPiece === -2)){
            killPiece(piece.x + Math.floor(mouseXDistanceFromPiece/2), piece.y + Math.floor(mouseYDistanceFromPiece/2));
            piece.x = _x;
            piece.y = _y;
            changePlayerTurn();
          }
        }
      }



      // if the piece isn't a king
      else if (!piece.isKing){
        // if the piece is white
        if (piece.team === "white"){
          // move piece normally
          if (mouseYDistanceFromPiece === -1 && (mouseXDistanceFromPiece === 1 || mouseXDistanceFromPiece === -1)){
            piece.x = _x;
            piece.y = _y;
            changePlayerTurn();
          }
          // try to kill black piece?
          // first detect if there's a black piece in the path
          else if (pieceGrid[piece.y + Math.floor(mouseYDistanceFromPiece/2)][piece.x + Math.floor(mouseXDistanceFromPiece/2)] === BLACK_IN_SPACE){  
          // then check if the move is legal or not
            if (mouseYDistanceFromPiece === -2 && (mouseXDistanceFromPiece === 2 || mouseXDistanceFromPiece === -2)){
              killPiece(piece.x + Math.floor(mouseXDistanceFromPiece/2), piece.y + Math.floor(mouseYDistanceFromPiece/2));
              piece.x = _x;
              piece.y = _y;
              changePlayerTurn();
            }
          }
        }

        // if the piece is black
        else if (piece.team === "black"){
          if (mouseYDistanceFromPiece === 1 && (mouseXDistanceFromPiece === 1 || mouseXDistanceFromPiece === -1)){
            piece.x = _x;
            piece.y = _y;
            changePlayerTurn();
          }
          // try to kill white piece?
          // first detect if there's a white piece in the path
          else if (pieceGrid[piece.y + Math.floor(mouseYDistanceFromPiece/2)][piece.x + Math.floor(mouseXDistanceFromPiece/2)] === WHITE_IN_SPACE){  
          // then check if the move is legal or not
            if (mouseYDistanceFromPiece === 2 && (mouseXDistanceFromPiece === 2 || mouseXDistanceFromPiece === -2)){
              killPiece(piece.x + Math.floor(mouseXDistanceFromPiece/2), piece.y + Math.floor(mouseYDistanceFromPiece/2));
              piece.x = _x;
              piece.y = _y;
              changePlayerTurn();
            }
          }
        }
      }
    }
  }
  selectedPieceID = null;
}

function killPiece(_x, _y){
  for (let i = pieces.length - 1; i >= 0; i--){
    if (pieces[i].x === _x && pieces[i].y === _y){
      pieces.splice(i, 1);
    }
  }
  caputurePieceSFX.play();
}



function changePlayerTurn(){
  if (playerTurn === "white"){
    playerTurn = "black";
  }
  else if (playerTurn === "black"){
    playerTurn = "white";
  }
  movePieceSFX.play();
}

function stateMachine(){
  let totalWhitePieces = 0;
  let totalBlackPieces = 0;
  // track total amount of black/white pieces
  if (gameState === "playing"){
    // track total amount of black/white pieces
    for (let y = 0; y < pieceGrid.length; y++){
      for (let x = 0; x < pieceGrid[y].length; x++ ){
        if (pieceGrid[y][x] === WHITE_IN_SPACE){
            totalWhitePieces += 1;
          }
        if (pieceGrid[y][x] === BLACK_IN_SPACE){
          totalBlackPieces += 1;
        }
      }
    }

    // if there are no pieces for a team, the game is ended
    if (totalWhitePieces <= 0){
      gameState = "finished";
      winner = "Black";
    }
    if (totalBlackPieces <= 0){
      gameState = "finished";
      winner = "White";
    }
  }

  // if the game ends
  if (gameState === "finished"){
    let winningText = winner + " Wins! Press R to restart.";
    stroke("white");
    fill("black");
    textSize(customFontSize);
    text(winningText, width/2 - (customFontSize/5 * winningText.length), height/2);
  }
}

// press 'r' to reset the game
function keyPressed(){
  if (key === "r" && gameState === "finished"){
    reset();
  }
}

// resets the board & game
function reset(){
  if (width < height){
    cellSize = width / GRID_DIMENSIONS; 
  }
  if (height < width){
    cellSize = height / GRID_DIMENSIONS; 
  }

  gridStartingX = width / 2 - cellSize * (GRID_DIMENSIONS / 2);
  gridStartingY = height / 2 - cellSize * (GRID_DIMENSIONS / 2);

  grid = generateGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
  generatePieces();

  customFontSize = sqrt(width * height)/30;

  gameMusic.stop();
  gameMusic.setVolume(0.2);
  gameMusic.loop();

  gameState = "playing";
}