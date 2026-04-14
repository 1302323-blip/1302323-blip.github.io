// Grid Based Game (chess/checkers)
// Steven Qiu
// March 23, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// final things i want to do to finish up the project
// - extra for experts (1. sound effects; 2. background music) #2
// - chain kills #4
// - making it more clear whose turn it is #5
// - win/lose conditions (also deal with 'draws') #3

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

let gameState = "playing" // playing, finished
let winner = null;

// sound effects/assets
let clickPieceSFX;
let movePieceSFX;
let promotePieceSFX;



function preload(){
  clickPieceSFX = loadSound("SFX/sound_click.wav");
  promotePieceSFX = loadSound("SFX/Picked Coin Echo.wav");
}



class checkerPiece {
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

  draw(){
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

  update(){
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



function setup() {
  createCanvas(windowWidth, windowHeight);
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
}

function draw() {
  noStroke();
  background(220);

  displayGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
  displayPieces();
  pieceGrid = trackingPiecesOnGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
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

// generates checkers board (and that's it)
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



function displayPieces(){
  for (let i = pieces.length - 1; i >= 0; i--){
    pieces[i].update();
    pieces[i].draw();
  }
}

// initially generates pieces
function generatePieces(){
  // generates black pieces
  for (let y = 0; y <= 2; y++){
    for (let x = 0; x < GRID_DIMENSIONS; x++){
      if (grid[y][x] === BLACK_TILE){
        pieces.push(new checkerPiece(x, y, "black"));
      }
    }
  }

  // generates white pieces
  for (let y = 5; y <= 7; y++){
    for (let x = 0; x < GRID_DIMENSIONS; x++){
      if (grid[y][x] === BLACK_TILE){
        pieces.push(new checkerPiece(x, y, "white"));
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
  let x = Math.floor((mouseX - gridStartingX)/cellSize);
  let y = Math.floor((mouseY - gridStartingY)/cellSize);

  if (selectedPieceID === null){
    mousePieceCheck(x, y);
  }
  else if (selectedPieceID !== null){
    mouseMovePiece(x, y, selectedPieceID);
  }
  console.log(selectedPieceID);
}

// checks if, when the mouse is clicked, a piece is there
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
  console.log(piece);
  let mouseXDistanceFromPiece = _x - piece.x;
  let mouseYDistanceFromPiece = _y - piece.y;
  console.log(mouseXDistanceFromPiece);
  console.log(mouseYDistanceFromPiece);

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
      console.log(pieces[i]);
      pieces.splice(i, 1);
    }
  }
}

function changePlayerTurn(){
  if (playerTurn === "white"){
    playerTurn = "black";
  }
  else if (playerTurn === "black"){
    playerTurn = "white";
  }
  clickPieceSFX.play();
}