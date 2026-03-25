// Character in Grid demo

const CELL_SIZE = 60;
const OPEN_CELL = 0;
const WALL_CELL = 1;
const PLAYER_CELL = 2;

let rows;
let cols;
let grid;

let player = {
  x: 0,
  y: 0,
};

let pathImg;
let lavaImg;

function preload(){
  pathImg = loadImage("walkingPath.jpg");
  lavaImg = loadImage("lava.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  // put character in grid
  grid[player.y][player.x] = PLAYER_CELL;
}

function draw() {
  noStroke();
  background(220);
  displayGrid();
}



function displayGrid(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === OPEN_CELL){
        // fill("white");
        image(pathImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === WALL_CELL){
        // fill("black");
        image(lavaImg, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === PLAYER_CELL){
        fill("purple");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      // square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      if (random(100) < 50){
        newGrid[y].push(OPEN_CELL);
      }
      else {
        newGrid[y].push(WALL_CELL);
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
    if (grid[y][x] === WALL_CELL){
      grid[y][x] = OPEN_CELL;
    }
    else if (grid[y][x] === OPEN_CELL){
      grid[y][x] = WALL_CELL;
    }
  }
}



function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(cols, rows);
    grid[player.y][player.x] = PLAYER_CELL;
  }

  if (key === "e"){
    grid = generateEmptyGrid(cols, rows);
    grid[player.y][player.x] = PLAYER_CELL;
  }

  // turns fully black
  if (key === "b"){
    grid = generateBlackenedGrid(cols, rows);
    grid[player.y][player.x] = PLAYER_CELL;
  }

  // player controls
  if (key === "s"){
    movePlayer(player.x, player.y + 1);
  }
  else if(key === "w"){
    movePlayer(player.x, player.y - 1);
  }
  else if (key === "a"){
    movePlayer(player.x - 1, player.y);
  }
  else if (key === "d"){
    movePlayer(player.x + 1, player.y);
  }
}

function movePlayer(x, y){
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_CELL){
    // keep track of where player was
    let oldX = player.x;
    let oldY = player.y;

    // move player
    player.x = x;
    player.y = y;

    // place player in grid
    grid[player.y][player.x] = PLAYER_CELL;
    // reset old player spot to be in open tile
    grid[oldY][oldX] = OPEN_CELL;
  }
}



function generateEmptyGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(OPEN_CELL);
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
      newGrid[y].push(WALL_CELL);
    }
  } 
  return newGrid;
}