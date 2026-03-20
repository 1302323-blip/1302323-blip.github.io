// 2D Grid Demo
// learning 2D arrays

// use if hard coding the grid
// let theGrid = [[1, 0, 0, 1],
//                [1, 0, 1, 0],
//                [0, 1, 0, 0],
//                [1, 0, 1, 1]];

// const SQUARE_DIMENSION = theGrid.length;

// use if randomizing the grid
const SQUARE_DIMENSION = 10;

let cellSize;


function setup() {
  createCanvas(windowWidth, windowHeight);

  if (width > height){
    cellSize = height/SQUARE_DIMENSION;
  }
  else {
    cellSize = width/SQUARE_DIMENSION;
  }
  theGrid = randomizeGrid(SQUARE_DIMENSION, SQUARE_DIMENSION);
}

function draw() {
  background(220);
  showGrid();
}

function showGrid(){
  for (let y = 0; y < SQUARE_DIMENSION; y++){
    for (let x = 0; x < SQUARE_DIMENSION; x++){
      if (theGrid[y][x] === 1){
        fill("black");
      }
      else if (theGrid[y][x] === 0){
        fill("white");
      }

      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
}

function toggleCell(x, y){
  if (theGrid[y][x] === 1){
    theGrid[y][x] = 0;
  }
  else if (theGrid[y][x] === 0){
    theGrid[y][x] = 1;
  }
}

function randomizeGrid(columns, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < columns; x++){
      if (random(100) < 50){
        newGrid[y].push[0];
      }
      else{
        newGrid[y].push[1];
      }
    }
  }
  return newGrid;
}