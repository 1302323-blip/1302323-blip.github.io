// Inheritance OOP Demo

let myCar;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // myCar = new Vehicle("car", "Kona");
  myCar = new Car("Kona");

  console.log(myCar.getType());
  console.log(myCar.getName());
}

function draw() {
  background(220);
}

class Vehicle {
  constructor(_type, _name){
    this.type = _type;
    this.name = _name;
  }

  getName(){
    return this.name;
  }

  getType(){
    return this.type;
  }
}

class Car extends Vehicle {
  constructor(_name){
    super("car", _name);
  }

  getName(){
    return "This is a car called " + super.getName();
  }
}