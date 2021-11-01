"use strict";

/*
//-- Scoping and Scope chain

const calcAge = (birthYear) => {
  const age = 2037 - birthYear;

  // console.log(firstName);
  // console.log(lastName); // ReferenceError

  const printAge = () => {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear < 1996) {
      var millenial = true;
      const firstName = "Steven"; // Override global variable w/ new variable.
      output = "NEW OUTPUT!"; // Mutating existing global variable.
      const str = `Oh, and you're a millenial, ${firstName}`;

      console.log(str);

      const add = (a, b) => {
        return a + b;
      };
    }

    // console.log(str); // ReferenceError
    console.log(millenial);
    // add(2, 3); // ReferenceError
    console.log(output);
  };
  printAge();

  return age;
};

const firstName = "Jonas";

calcAge(1991);

// console.log(age); // ReferenceError
// printAge(); // ReferenceError
*/

/*
//-- Hoisting and TDZ

// Variables

console.log(me); // undefined
// console.log(job); // ReferenceError, in TDZ
// console.log(year); // ReferenceError, in TDZ

var me = "Jonas";
let job = "teacher";
const year = 1991;

// Functions

console.log(addDecl(2, 3)); // 5
// console.log(addExpr(2, 3)); // ReferenceError, in TDZ
// console.log(addArrow(2, 3)); // ReferenceError, in TDZ

function addDecl(a, b) {
  return a + b;
}
const addExpr = function (a, b) {
  return a + b;
};
var addArrow = (a, b) => a + b;

// Example

// This is called even though numProducts is 10, but at this point in the
// code it is "undefined" due to hoisting.
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log("All products deleted!");
}

var x = 1; // Attached to the "window" object in global scope.
let y = 2; // Not attached to the "window" object.
const z = 3; // Not attached to the "window" object.
*/

/*
//-- The "this" keyword

console.log(this); // window

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAge(1991); // undefined in strict mode, window in sloppy mode

const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(1991); // window

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
  }
};
jonas.calcAge(); // jonas object

const matilda = {
  year: 2017
};
matilda.calcAge = jonas.calcAge; // "Method borrowing"
matilda.calcAge(); // matilda object

const func = jonas.calcAge;
func(); // undefined in strict mode, window in sloppy mode
*/

/*
//-- Regular functions vs. arrow functions

var firstName = "Matilda";

const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    // console.log(this);

    // const isMillenial = function () {
    //   console.log(this); // undefined in strict mode, window in sloppy mode
    //   console.log(this.year >= 1981 && this.year <= 1996);
    // };

    const isMillenial = () => {
      console.log(this); // jonas object
    };

    isMillenial();
  },
  // Never use arrow functions as methods! This is for demonstration purposes.
  greet: () => {
    console.log(this);
    // When we call this method, this line will print "Matilda", because var
    // attaches the variable on the window object and "this" refers to the
    // window object in this context.
    console.log(`Hey ${this.firstName}`);
  }
};
jonas.greet(); // window
jonas.calcAge();

// Arguments keyword

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 4, 5);

var addArrow = (a, b) => {
  // console.log(arguments); // ReferenceError!
  return a + b;
};
addArrow(2, 4, 5);
*/

/*
//-- Primitives (value types) vs. Objects (reference types)

// Prmitive types

let age = 30;
let oldAge = 30;
age = 31;
console.log(age);
console.log(oldAge);

let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

// reference types

const me = {
  name: "Jonas",
  age: 30
};
const friend = me;
friend.age = 27;
console.log("Friend:", friend); // {name: 'Jonas', age: 27}
console.log("Me:", me); // {name: 'Jonas', age: 27}

const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27
};
const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

// Copying objects

const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"]
};

const jessicaCopy = Object.assign({}, jessica2); // Shallow copy, not deep clone
jessicaCopy.lastName = "Davis";
console.log("Before marriage:", jessica2);
console.log("After marriage:", jessicaCopy);

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");

console.log("Before marriage:", jessica2);
console.log("After marriage:", jessicaCopy);
*/
