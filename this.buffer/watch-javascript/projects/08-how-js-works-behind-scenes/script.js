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
