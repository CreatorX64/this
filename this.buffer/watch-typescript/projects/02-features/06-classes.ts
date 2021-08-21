// One difference between ES2015 classes and TypeScript classes is that TS
// classes can have "access modifiers". The following access modifiers are
// available: public, protected, private. The default access modifier is
// "public".

class Vehicle {  // Superclass
  // color: string = "red";
  // color: string;

  // constructor(color: string) {
  //   this.color = color;
  // }

  // The short hand syntax to declare properties along with the constructor.
  // Note that if the property is public, then the "public" keyword is no longer
  // optional in this syntax, you must explicitly specify it
  constructor(public color: string) {}

  protected honk(): void {
    console.log("beep");
  }
}

const vehicle = new Vehicle("orange");
console.log(vehicle.color);

class Car extends Vehicle {  // Subclass
  // If we have a constructor function in Car, then we must explicitly accept
  // passed argumets and send related ones along to the parent class by calling
  // super()

  // Notice that in the shorthand syntax we can mix and match regular parameters
  // with class properties
  constructor(color: string, public wheels: number) {
    super(color);
  }

  private drive(): void {
    console.log("vroom");
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

// If we don't have a constructor function in Car, then TS will automatically
// call the constructor function in the parent class and pass in the arguments.
const car = new Car("red", 4);

car.startDrivingProcess();