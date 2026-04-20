// Connected Nodes OOP Demo

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // draw lines first
  for (let node of nodes){
    node.update();
    node.connectTo(nodes);
  }

  // draw circles over the lines
  for (let node of nodes){
    node.display();
  }
}

function mousePressed(){
  nodes.push(new Point(mouseX, mouseY));
}

class Point {
  constructor(_x, _y){
    this.x = _x;
    this.y = _y;

    this.currentRadius;
    this.minRadius = 15;
    this.maxRadius = 30;
    
    this.xTime = random(1000);
    this.yTime = random(1000);

    this.speed = 5;
    this.deltaTime = 0.05;

    this.colour = color(random(255), random(255), random(255));
    this.reach = 200;
    this.currentLineSize;
    this.minLineSize = 1;
    this.maxLineSize = 20;
  }

  display(){
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.currentRadius * 2);
  }

  update(){
    this.move();
    this.wrapAroundScreen();
    this.mouseIsNear();
  }

  connectTo(nodesArray){
    for (let otherNode of nodesArray){
      if (this !== otherNode){
        let distanceApart = dist(this.x, this.y, otherNode.x, otherNode.y);

        if (distanceApart < this.reach){
          let lineSize = map(distanceApart, 0, this.reach, this.maxLineSize, this.minLineSize);
          this.currentLineSize = lineSize;

          stroke(this.colour);
          strokeWeight(this.currentLineSize);
          line(this.x, this.y, otherNode.x, otherNode.y);
        }
      }
    }
  }



  wrapAroundScreen(){
    if (this.y < -this.currentRadius){
      this.y += height + this.currentRadius * 2;
    }
    if (this.y > height + this.currentRadius){
      this.y -= height + this.currentRadius * 2;
    }
    if (this.x < -this.currentRadius){
      this.x += width + this.currentRadius * 2;
    }
    if (this.x > width + this.currentRadius){
      this.x -= width + this.currentRadius * 2;
    }
  }

  move(){
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // scale from 0 - 1 to movement speed
    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    // move point
    this.x += dx;
    this.y += dy;

    // move on time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  mouseIsNear(){
    let mouseDistance = dist(mouseX, mouseY, this.x, this.y);

    if (mouseDistance < this.reach){
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.currentRadius = theSize;
    }
    else{
      this.currentRadius = this.minRadius;
    }
  }
}
