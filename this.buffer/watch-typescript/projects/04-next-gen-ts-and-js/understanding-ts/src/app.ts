// const userName = "Max";
// // userName = "Maximilian";

// let age = 30;
// age = 29;

// function add(a: number, b: number) {
//   let result;
//   result = a + b;
//   return result;
// }

// if (age > 20) {
//   // var isOld = true;
//   let isOld = true;
// }

// console.log(isOld); // ReferenceError

// console.log(result); // ReferenceError

// const add = (a: number, b: number = 1) => a + b;

// const printOutput: (a: number | string) => void = (output) =>
//   console.log(output);

// const button = document.querySelector("button");

// if (button) {
//   button.addEventListener("click", (event) => console.log(event));
// }

// printOutput(add(5, 2));
// printOutput(add(5));

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const person = {
  firstName: "Max",
  age: 30
};

const copiedPerson = { ...person };

// function add(...numbers: [number, number, number]): number {
function add(...numbers: number[]): number {
  return numbers.reduce((sum, curr) => sum + curr);
}

const addedNumbers = add(5, 10, 6, 5);
console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);

const { firstName: userName, age } = person;
console.log(person, userName, age);
