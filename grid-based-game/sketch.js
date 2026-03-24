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

let cellSize;
let grid;
let pieceGrid; // identical grid that contains the pieces/units

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

function generatePieceGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(0);
    }
  }
  
  // generate black pieces
  for (let y = 0; y <= 2; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === BLACK_TILE){
        newGrid[y][x] = 3;
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