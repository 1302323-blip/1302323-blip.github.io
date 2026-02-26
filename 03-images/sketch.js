// Images Demo

// images are stored in a variable
let madkitImg;

function preload() {
  madkitImg = loadImage("Madkit.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(madkitImg, mouseX, mouseY, madkitImg.width * 0.5, madkitImg.height * 0.5);
}
