// Scope Demo

// global variable
let number = 80;

function setup() {
  createCanvas(700, 400);
  background("black");
  stroke("white");
  noLoop();
}

function draw() {
  // number = 50;
  line(number, 0, number, height);
  // declare local variables before using them. failure results in  d e a t h
  // doesnt matter too much for global variables. funny things may happen though

  // local variable
  for (let number = 120; number < 200; number += 2) {
    line(number, 0, number, height);
    console.log(number);
  }
  
  drawAnotherLine();

  // doesn't use the local variable in draw(), as its not local to that function
  drawYetOneMoreLine();
}

function drawAnotherLine() {
  // local variable
  let number = 320;
  line(number, 0, number, height);
}

function drawYetOneMoreLine(){
  // uses global variable
  line(number + 5, 0, number + 5, height);
}

// defaults to local
// defaults to global if no local