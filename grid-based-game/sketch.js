// Grid Based Game (chess/checkers)
// Steven Qiu
// March 23, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// 0 - empty
// 1 - pawn
// 2 - knight
// 3 - bishop
// 4 - rook
// 5 - queen
// 6 - king

// 0 - empty
// 1 - white
// 2 - whiteKing
// 3 - black
// 4 - blackKing
const GRID_DIMENSIONS = 8;
const BLACK_TILE = 1;
const WHITE_TILE = 0;

// location of pieces
const EMPTY_SPACE = 0;
const WHITE_IN_SPACE = 1;
// const WHITE_K_IN_SPACE = 2;
const BLACK_IN_SPACE = 2;
// const BLACK_K_IN_SPACE = 4;

// rows that turn pieces into kings
const BLACK_CONVERT_ROW = 7;
const WHITE_CONVERT_ROW = 0;

let cellSize;
let grid;
let pieceGrid; // identical grid that contains the pieces/units

// let whitePieces = [];
// let blackPieces = [];

let pieces = [];

// (sort of) state related variables
let selectedPieceID = null;
let playerTurn = "white";

class checkerPiece {
  constructor(_x, _y, teamColour){
    this.x = _x;
    this.y = _y;
    this.team = teamColour; // only black and white teams
    // this.colour = "white";
    this.radius = cellSize * 3/4;

    this.isKing = false;
    this.selected = false;
    this.alive = true;

    this.centerOfCellX = cellSize/2;
    this.centerOfCellY = cellSize/2;
  }

  draw(){
    stroke("black");
    fill(this.team);
    circle(this.x * cellSize + this.centerOfCellX, this.y * cellSize + this.centerOfCellY, this.radius);
  }
}

// class blackPiece extends whitePiece{
//   constructor(_x, _y){
//     this.x = _x;
//     this.y = _y;
//     this.team = blackPiece;

//     this.isKing = false;
//   }
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height){
    cellSize = width / GRID_DIMENSIONS; 
  }
  if (height < width){
    cellSize = height / GRID_DIMENSIONS; 
  }

  grid = generateGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
  generatePieces(GRID_DIMENSIONS, GRID_DIMENSIONS);
}

function draw() {
  noStroke();
  background(220);

  displayGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
  displayPieces();
  // for (let i = pieces.length - 1; i >= 0; i--){
  //   // pieceGrid = trackingPiecesOnGrid(GRID_DIMENSIONS, GRID_DIMENSIONS, pieces[i]);

  //   pieceGrid = trackingPiecesOnGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
  // }
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
      square(x * cellSize, y * cellSize, cellSize);
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
    pieces[i].draw();
  }
}

// initially generates pieces
function generatePieces(cols, rows){
  // generates black pieces
  for (let y = 0; y <= 2; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === BLACK_TILE){
        pieces.push(new checkerPiece(x, y, "black"));
      }
    }
  }

  // generates white pieces
  for (let y = 5; y <= 7; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === BLACK_TILE){
        pieces.push(new checkerPiece(x, y, "white"));
      }
    }
  }
}

// tracks where the pieces are on the grid

// bug: it runs the entire thing, but only checks the position of a single piece for some reason
// that's the theory at least though
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



function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

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
  refreshMousePressCheck();

  // make sure to check who's turn it is as well
  if (_x >= 0 && _x < GRID_DIMENSIONS && _y >= 0 && _y < GRID_DIMENSIONS){
    for (let piece of pieces){
      if (_x === piece.x && _y === piece.y){
        selectedPieceID = piece;
        piece.selected = true;
      }
    }
  }
}

// experiement
// function mousePressed(){
//   let x = Math.floor(mouseX/cellSize);
//   let y = Math.floor(mouseY/cellSize);

//   for (let i of pieces){
//     if (selectedPieceID === null){
//       mousePieceCheck(x, y, i);
//     }
//     else if (selectedPieceID !== null){
//       selectedPieceID = null;
//     }
//   }
//   console.log(selectedPieceID);
// }

// // checks if, when the mouse is clicked, a piece is there
// function mousePieceCheck(_x, _y, piece){
//   refreshMousePressCheck();

//   if (_x >= 0 && _x < GRID_DIMENSIONS && _y >= 0 && _y < GRID_DIMENSIONS){
//     if (_x === piece.x && _y === piece.y){
//       selectedPieceID = piece;
//       piece.selected = true;
//     }
//   }
// }

// allows you to move the piece after clicking it
// should check for collision as well, and if it can jump over an enemy piece
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
          console.log("movedPiece");
          console.log(pieceGrid);
          piece.x = _x;
          piece.y = _y;
        }
      }
      // if the piece isn't a king
      else if (!piece.isKing){
        // if the piece is white
        if (piece.team === "white"){
          // move piece normally
          if (mouseYDistanceFromPiece === -1 && (mouseXDistanceFromPiece === 1 || mouseXDistanceFromPiece === -1)){
            console.log("movedPiece");
            // console.log(pieceGrid);
            piece.x = _x;
            piece.y = _y;
          }
          // try to kill black piece?
          // first detect if there's a black piece in the path
          else if (pieceGrid[_y + Math.floor(mouseYDistanceFromPiece/2)][_x + Math.floor(mouseYDistanceFromPiece/2)] === BLACK_IN_SPACE){
            // then check if the move is legal or not
            if (mouseYDistanceFromPiece === -2 && (mouseXDistanceFromPiece === 2 || mouseXDistanceFromPiece === -2)){
              console.log("kill piece");
              // console.log(pieceGrid);
              // piece.x = _x;
              // piece.y = _y;
            }
          }
        }
        // if the piece is black
        else if (piece.team === "black"){
          if (mouseYDistanceFromPiece === 1 && (mouseXDistanceFromPiece === 1 || mouseXDistanceFromPiece === -1)){
            console.log("movedPiece");
            console.log(pieceGrid);
            piece.x = _x;
            piece.y = _y;
          }
        }
      }
    }
  }
  selectedPieceID = null;
}

// is on grid?
// is there a piece on the square you're trying to move?
// is the piece a king?
  // can you kill an enemy piece?
// if the piece isnt a king...
  // which team?
  // can you still kill an enemy piece?



// unsure if end up needing this
// if not just remove all piece.selected instances
function refreshMousePressCheck(){
  for (let piece of pieces){
    piece.selected = false;
  }
  selectedPieceID = null;
}