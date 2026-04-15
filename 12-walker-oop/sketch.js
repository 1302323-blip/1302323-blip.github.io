// Walker OOP Demo

class Walker {
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.diameter = 2;
    this.speed = 5;
    this.color = color;
  }

  display(){
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.diameter);
  }

  move(){
    let choice = random(100);
    if (choice < 25){
      // right
      this.x += this.speed;
    }
    else if (choice < 50){
      // left
      this.x -= this.speed;
    }
    else if (choice < 75){
      // down
      this.y += this.speed;
    }
    else {
      // up
      this.y -= this.speed;
    }
  }
}

let theWalkers = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  for (let walker of theWalkers){
    walker.display();
    walker.move();
  }
}

function mousePressed(){
  let newWalker = new Walker(mouseX, mouseY, "red");
  newWalker.color = color(random(255), random(255), random(255));
  theWalkers.push(newWalker);
}



// version with only 2 walkers

// let zeph;
// let violet;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   zeph = new Walker(width/2, height/2, "red");
//   violet = new Walker(300, 500, "purple");
// }

// function draw() {
//   zeph.move();
//   violet.move();
  
//   zeph.display();
//   violet.display();
// }
