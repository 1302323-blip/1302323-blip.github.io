// Perlin Noise Demo

let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  ball();
}

function ball(){
  fill("black");
  let x = noise(time) * width;
  let y = noise(time + 1000) * height;
  circle(x, y, 75);

  time += 0.01;
}