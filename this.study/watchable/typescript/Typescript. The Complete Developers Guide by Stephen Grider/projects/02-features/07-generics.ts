class ArrayOfNumbers {
  constructor(public collection: number[]) {}

  get(index: number): number {
    return this.collection[index];
  }
}

class ArrayOfStrings {
  constructor(public collection: string[]) {}

  get(index: number): string {
    return this.collection[index];
  }
}

class ArrayOfAnything<T> {
  constructor(public collection: T[]) {}

  get(index: number): T {
    return this.collection[index];
  }
}

// const things = new ArrayOfAnything<string>(["a", "b", "c"]);

// "things" is still ArrayOfAnything<string> thanks to type inference. However,
// it is still recommended to include the generic type the same reason as you
// would include the type for function return types: Your code should be able to
// catch errors if a wrong type is being passed/used.
const things = new ArrayOfAnything(["a", "b", "c"]);

// Generics with functions

function printStrings(arr: string[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

function printNumbers(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

function printAnything<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// printAnything(["a", "b", "c"]); // Type inference
printAnything<string>(["a", "b", "c"]); // Recommended

// Generic constraints

class Car {
  print() {
    console.log("I am a car");
  }
}

class House {
  print() {
    console.log("I am a house");
  }
}

interface Printable {
  print(): void;
}

function printHousesOrCards<T extends Printable>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print();
  }
}

// printHousesOrCards([1, 2, 3, 4]); // Error
printHousesOrCards<House>([new House(), new House()]);
printHousesOrCards<Car>([new Car(), new Car()]);
