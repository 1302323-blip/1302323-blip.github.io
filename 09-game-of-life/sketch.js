// Game of Life

const CELL_SIZE = 20;
let rows;
let cols;
let grid;

let autoPlayOn = false;
let renderIntervals = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);

  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  // noStroke();
  background(220);
  if (autoPlayOn && frameCount % renderIntervals === 0){
    grid = takeTurn();
  }
  displayGrid();
}

function displayGrid(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === 0){
        fill("white");
      }
      else if (grid[y][x] === 1){
        fill("black");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      if (random(100) < 50){
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  } 
  return newGrid;
}

function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x, y);
}

function toggleCell(x, y){
  if (x >= 0 && x < cols && y >= 0 && y < rows){
    if (grid[y][x] === 1){
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0){
      grid[y][x] = 1;
    }
  }
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(cols, rows);
  }

  else if (key === "e"){
    grid = generateEmptyGrid(cols, rows);
  }

  else if (key === " "){
    grid = takeTurn();
  }

  else if (key === "a"){
    autoPlayOn = !autoPlayOn;
  }

  // turns fully black
  else if (key === "b"){
    grid = generateBlackenedGrid(cols, rows);
  }
}

function generateEmptyGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(0);
    }
  } 
  return newGrid;
}

// turn fully black
function generateBlackenedGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(1);
    }
  } 
  return newGrid;
}

function takeTurn(){
  let nextTurn = generateEmptyGrid(cols, rows);

  // look at every cell
  for (let x = 0; x < cols; x++){
    for (let y = 0; y < rows; y++){
      let neighbours = 0;

      // look at neightbours around it
      for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
          // don't fall off edge of grid
          if (x + i >= 0 && x + i < cols && y + j >= 0 && y + j < rows){
            neighbours += grid[y + j][x + i];
          }
        }
      }

      // don't count self as neightbour
      neighbours -= grid[y][x];

      // apply the rules
      if (grid[y][x] === 1){ // currently alive
        if (neighbours === 2 || neighbours === 3){
          nextTurn[y][x] = 1;
        }
      }
      else if (grid[y][x] === 0){ // currently dead
        if (neighbours === 3){
          nextTurn[y][x] = 1;
        }
      }
    }
  }

  return nextTurn;
}