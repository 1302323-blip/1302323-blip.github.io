// Generative Art Demo

let theTiles = [];
const THE_SIZE = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let controlY = 0; controlY < height; controlY += THE_SIZE){
    for (let controlX = 0; controlX <= width; controlX += THE_SIZE){
      let someTile = spawnTile(controlX + THE_SIZE/2, controlY + THE_SIZE/2, THE_SIZE);
      theTiles.push(someTile);
    }
  }
}

function draw() {
  background(220);

  for (let tile of theTiles){
    line(tile.x1, tile.y1, tile.x2, tile.y2);
  }
}

function spawnTile(x, y, tileSize){
  let slopeSign = random(100);
  let tile;
  if (slopeSign < 50){
    // positive slope
    tile = {
      x1: x - tileSize/2,
      y1: y + tileSize/2,
      x2: x + tileSize/2,
      y2: y - tileSize/2,
    };
  }
  else {
    // negative slope
    tile = {
      x1: x - tileSize/2,
      y1: y - tileSize/2,
      x2: x + tileSize/2,
      y2: y + tileSize/2,
    };
  }
  return tile;
}