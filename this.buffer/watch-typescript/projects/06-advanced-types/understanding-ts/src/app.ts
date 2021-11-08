//-- Intersection types using interfaces
/*
interface Admin {
  name: string;
  privilages: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

interface ElevatedEmployee extends Admin, Employee {}
*/

//-- Intersection types using type aliases
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// In the case of object types, the intersection type will be a combination
// of the two.
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

// In the case of primitive types, the intersection type will contain common
// types that's in all the intersected types. Here, Universal becomes type
// of "number".
type Universal = Combinable & Numeric;

//-- Type guards

// Type guard for primitive type.

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

// Type guard for interface or type alias.

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name:", emp.name);

  if ("privileges" in emp) {
    console.log("Privileges:", emp.privileges);
  }

  if ("startDate" in emp) {
    console.log("Start date:", emp.startDate);
  }
}

printEmployeeInformation(e1);
console.log("---");
printEmployeeInformation({ name: "Manu", startDate: new Date() });
console.log("---");

// Type guard for class.

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo...", amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

//-- Discriminated unions
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

// This is a "discriminated union" because there's a property in all types in
// the union that discriminate them uniquely. So in the switch statement below,
// instead of checking for a random property, we can check a property that
// we know of which has the sole purpose of discriminating other types that
// belong in its union.
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;

  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }

  console.log("Moving at speed:", speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//-- Type casting
// Since we selected by tag name, TS knows this is of type HTMLInputElement.
// const inputElem = document.querySelector("input");

// If we select by class, the TS doesn't know what specific type of element it is,
// so it's now of type Element.
// const inputElem = <HTMLInputElement>document.querySelector(".user-input");
const inputElem = document.querySelector(".user-input") as HTMLInputElement;

// This "if" is not necessary for TS to compile, but it's good to have.
if (inputElem) {
  inputElem.value = "Hi there!";
}

// Side note: We have access to types like HTMLInputElement because "DOM" is
// included in our "lib" configuration.

//-- Index properties
interface ErrorContainer {
  // id: number; // Error
  // message: string; // If we add this, then every value of this type should have this prop + any other prop (as defined below).
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  text: "Not a valid email!",
  2: "Number keys can be interpreted as strings, so this is okay"
};

//-- Function overloads

function addTwo(a: number, b: number): number;
function addTwo(a: string, b: string): string;
function addTwo(a: string, b: number): string;
function addTwo(a: number, b: string): string;
function addTwo(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

const result1 = addTwo("Max", " Schwarz");
console.log("Result 1:", result1);
const result2 = addTwo(2, 2);
console.log(result2);

//-- Optional chaining

const fetchedUserData = {
  id: "ul1",
  name: "Max"
  // job: { title: "CEO", description: "My own company" }
};

// console.log(fetchedUserData?.job?.title);

//-- Nullish coalescing

const userInput = null;
const storedData = userInput ?? "DEFAULT";

console.log(storedData);
