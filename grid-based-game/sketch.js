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
const WHITE_K_IN_SPACE = 2;
const BLACK_IN_SPACE = 3;
const BLACK_K_IN_SPACE = 4;

// rows that turn pieces into kings
const BLACK_CONVERT_ROW = 7;
const WHITE_CONVERT_ROW = 0;

let cellSize;
let grid;
let pieceGrid; // identical grid that contains the pieces/units

let whitePieces = [];
let blackPieces = [];

class whitePiece {
  constructor(_x, _y){
    this.x;
    this.y;
    this.team = white;
    this.colour = "white";
    this.size;

    this.isKing = false;
  }

  draw(){
    fill(this.colour);
    rectMode(CENTER);
    square
  }
}

class blackPiece extends whitePiece{
  constructor(_x, _y){
    this.x = _x;
    this.y = _y;
    this.team = blackPiece;

    this.isKing = false;
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

  grid = generateGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
  pieceGrid = generatePieceGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
}

function draw() {
  noStroke();
  background(220);
  displayGrid(GRID_DIMENSIONS, GRID_DIMENSIONS);
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

// initially generates pieces
function generatePieceGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(EMPTY_SPACE);
    }
  }
  
  // generate black pieces
  for (let y = 0; y <= 2; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === BLACK_TILE){
        newGrid[y][x] = BLACK_IN_SPACE;
      }
    }
  }

  // generate white pieces
  for (let y = 5; y <= 7; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === BLACK_TILE){
        newGrid[y][x] = WHITE_IN_SPACE;
      }
    }
  }
  return newGrid;
}

// function generateRandomGrid(cols, rows){
//   let newGrid = [];
//   for (let y = 0; y < rows; y++){
//     newGrid.push([]);
//     for (let x = 0; x < cols; x++){
//       if (random(100) < 50){
//         newGrid[y].push(0);
//       }
//       else {
//         newGrid[y].push(1);
//       }
//     }
//   } 
//   return newGrid;
// }

// function mousePressed(){
//   let x = Math.floor(mouseX/CELL_SIZE);
//   let y = Math.floor(mouseY/CELL_SIZE);

//   toggleCell(x, y);
//   toggleCell(x - 1, y);
//   toggleCell(x + 1, y);
//   toggleCell(x, y - 1);
//   toggleCell(x, y + 1);
// }

// function toggleCell(x, y){
//   if (x >= 0 && x < cols && y >= 0 && y < rows){
//     if (grid[y][x] === 1){
//       grid[y][x] = 0;
//     }
//     else if (grid[y][x] === 0){
//       grid[y][x] = 1;
//     }
//   }
// }

// function keyPressed(){
//   if (key === "r"){
//     grid = generateRandomGrid(cols, rows);
//   }

//   if (key === "e"){
//     grid = generateEmptyGrid(cols, rows);
//   }

//   // turns fully black
//   if (key === "b"){
//     grid = generateBlackenedGrid(cols, rows);
//   }
// }



// // turn fully black
// function generateBlackenedGrid(cols, rows){
//   let newGrid = [];
//   for (let y = 0; y < rows; y++){
//     newGrid.push([]);
//     for (let x = 0; x < cols; x++){
//       newGrid[y].push(1);
//     }
//   } 
//   return newGrid;
// }