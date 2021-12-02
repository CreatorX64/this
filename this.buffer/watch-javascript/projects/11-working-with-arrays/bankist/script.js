"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/*
//-- Simple array methods

let arr = ["a", "b", "c", "d", "e"];

// Slice

console.log(arr.slice(2)); // ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // ['c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(1, -1)); // ['b', 'c', 'd']
console.log(arr.slice()); // Shallow copy
console.log([...arr]); // Shallow copy

// Splice

// console.log(arr.splice(2)); // ['c', 'd', 'e']
// console.log(arr); // ['a', 'b'] Original array is mutated

// arr.splice(-1); // Remove & return the last element
// console.log(arr);

// arr.splice(1, 2);
// console.log(arr); // ['a', 'd', 'e']

// Reverse

const arr2 = ["j", "i", "h", "g", "f"];

console.log(arr2.reverse()); // Mutates original array
console.log(arr2);

// Concat

arr = ["a", "b", "c", "d", "e"];
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// Join

console.log(letters.join(" — "));
*/

/*
//-- The at() method (ES2022): Useful for accessing single array items relative
// to array end, or using with method chaining.

const arr = [23, 11, 64];

// Getting the last element

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

// Getting an arbitrary element

console.log(arr[0]);
console.log(arr.at(0));
console.log(arr.at(-2));

// Also works with strings

console.log("jonas".at(-1));
*/

/*
//-- Looping arrays: forEach: One notable difference from classical loops or
// for...of loop is that you cannot break; or continue; inside a forEach loop.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, mov] of movements.entries()) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
}

console.log("--------");

// forEach() params: Current array item, current item index, whole array.
movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
*/

/*
//-- forEach with Maps and Sets

// Map

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"]
]);

// forEach params on a Map correspond to the params of the array version.
currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// Set

const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);

// forEach params on Set: "value" and "key" hold the same value because a Set
// doesn't have keys or indexes, so there's no value that would make sense
// for the key parameter. That's why the value is passed to both of the
// first 2 parameters so that the method signature would be the same as it
// is on arrays and Maps.
currenciesUnique.forEach((value, key, set) => {
  console.log(`${key}: ${value}`);
});
*/
