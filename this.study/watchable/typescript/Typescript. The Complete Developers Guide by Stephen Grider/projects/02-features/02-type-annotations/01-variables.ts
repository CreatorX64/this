// Type annotations for primitives

// let apples: number = 5;
// let apples = 5;  // Type inference

// Because declaration and initialization are on separate lines, type inference
// doesn't take effect. "apples" is of type "any"
let apples;
apples = 5;

let speed: string = "fast";
let hasName: boolean = true;
let nothingMuch: null = null;
let nothing: undefined = undefined;

// Type annotations for built-in objects
let now: Date = new Date();

// Type annotations for arrays
let colors: string[] = ["red", "green", "blue"];
let myNumbers: number[] = [1, 2, 3];
let truths: boolean[] = [true, true, false];

// Type annotations for classes
class Car { }
let car: Car = new Car();

// Type annotations for object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20
};

// Type annotations for functions
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

// In this whole file, we didn't actually have to add type annotations. Type
// inference would work perfectly. If declaration and initialization are on
// the same line, TypeScript will figure out the type of variable for us, which
// is the case for all variables in this file. In light of all of this, we
// would use type annotations in the following cases:

// 1) When a function returns the "any" type and we need to clarify the value
const json = "{\"x\": 10, \"y\": 20}";
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates);  // { x: 10, y: 20 }

// 2) When we declare a variable on one line then initialize it later
let words = ["red", "green", "blue"];
let foundWord: boolean;
for (let i = 0; i < words.length; i++) {
  if (words[i] === "green") {
    foundWord = true;
  }
}

// 3) When we want a variable to have a type that can't be inferred
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}

// And, we would use type inference (more correctly, we will allow type inference
// to take effect by not putting type annotations) in the following cases: Always!