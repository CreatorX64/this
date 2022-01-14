import { sum } from "./calc";

let printMessage = (msg: string): void => console.log(`Message: ${msg}`);

let message = "Hello, TypeScript";
printMessage(message);

// Following code will generate a compiler error when "target" is "ES5"
// let data = new Map();
// data.set("Bob", "London");
// data.set("Alice", "Paris");
// data.forEach((val, key) => console.log(`${key}: ${val}`));

let total = sum(100, 200, 300);
console.log(`Total: ${total}`);
