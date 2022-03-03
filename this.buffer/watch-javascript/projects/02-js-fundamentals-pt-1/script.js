/*
//-- Variables and values

let js = "amazing";
// console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

// Variable name conventions

let firstName = "Matilda";
let first = "Jonas";
let jonas_matilda = "J&M";
// let jonas&matilda = "J&M"; // Error!
// let 3year = 3; // Error!
// let name = "Jonas"; // No error, but it's a reserved keyword so don't use!
// let new = "new"; // Error!
// let function = "function"; // Error!
let $new = "new";
let $function = "function";

console.log(firstName);
console.log(firstName);
console.log(firstName);
*/

/*
//-- Data types

let jsIsFun = true;
console.log(jsIsFun);

console.log(typeof jsIsFun);
// console.log(typeof true);
// console.log(typeof 23);
// console.log(typeof "Jonas");

jsIsFun = "YES!";
console.log(typeof jsIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

// This is an error in JS that wasn't fixed for backwards compatibility.
console.log(typeof null); // "object"
*/

/*
//-- let, const, var

let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990; // Error!
// const job; // Error!

var job = "programmer";
job = "teacher";
lastNameVar = "Schmedtmann"; // No error! Created on global object.
console.log(lastNameVar);
*/

/*
//-- Basic operators

// Math operators

const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);

const firstName = "Jonas";
const lastName = "Schmedtmann";
console.log(firstName + " " + lastName);

// Assignment operators

let x = 10 + 5;
x += 10;
x *= 4;
x++;
x--;
console.log(x);

// Comparison operators

console.log(ageJonas > ageSarah);
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);
*/

/*
//-- Operator precedence

const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);
*/

/*
//-- Coding challenge #1

// const markMass = 78;
// const markHeight = 1.69;
// const johnMass = 92;
// const johnHeight = 1.95;

const markMass = 95;
const markHeight = 1.88;
const johnMass = 85;
const johnHeight = 1.76;

const markBmi = markMass / markHeight ** 2;
const johnBmi = johnMass / (johnHeight * johnHeight);

const markHigherBmi = markBmi > johnBmi;

console.log(markBmi, johnBmi, markHigherBmi);
*/

/*
//-- Strings and template literals

const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

const jonas =
  "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(jonasNew);

console.log(`Just a regular string...`);

console.log("String with \
single line on \
multiple lines");

console.log("String with \n\
multiple \n\
lines");

console.log(`String with
multiple
lines`);
*/

/*
//-- Making decisions: if/else statements

const age = 15;

if (age >= 18) {
  console.log("Sarah can get a driver's license 🚗");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;
let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);
*/

/*
//-- Coding challenge #2

// const markMass = 78;
// const markHeight = 1.69;
// const johnMass = 92;
// const johnHeight = 1.95;

const markMass = 95;
const markHeight = 1.88;
const johnMass = 85;
const johnHeight = 1.76;

const markBmi = markMass / markHeight ** 2;
const johnBmi = johnMass / (johnHeight * johnHeight);

const markHigherBmi = markBmi > johnBmi;

if (markHigherBmi) {
  console.log(`Mark's BMI ${markBmi} is higher than John's ${johnBmi}!`);
} else {
  console.log(`John's ${johnBmi} BMI is higher than Mark's ${markBmi}!`);
}
*/

/*
//-- Type conversion and coercion

// Type conversion

const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number("Jonas")); // NaN
console.log(typeof NaN); // number

console.log(String(23), 23);

// Type coercion

console.log("I am " + 23 + " years old");
console.log("23" - "10" - 3);
console.log("23" / "2");
console.log("28" > "18");

let n = "1" + 1;
n = n - 1;
console.log(n); // 10
*/

/*
//-- Truthy and falsy values

// Falsy values: 0, "", undefined, null, NaN
// Truthy values: Everything else!

console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("Jonas")); // true
console.log(Boolean({})); // true
console.log(Boolean("")); // false

const money = 0;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log("You should get a job!");
}

let height;
if (height) {
  console.log("Height is defined!");
} else {
  console.log("Height is undefined :(");
}
*/

/*
//-- Equality operators: == vs ===

const age = "18";

if (age === 18) {
  console.log("You just became an adult :D (strict)");
}

if (age == 18) {
  console.log("You just became an adult :D (loose)");
}

const favorite = Number(prompt("What's your favorite number?"));
console.log(favorite);
console.log(typeof favorite);

if (favorite === 23) {
  console.log("Cool! 23 is an amazing number!");
} else if (favorite === 7) {
  console.log("7 is also a cool number");
} else if (favorite === 9) {
  console.log("9 is also a cool number");
} else {
  console.log("Number is not 23 or 7 or 9");
}

if (favorite !== 23) {
  console.log("Why not 23?");
}
*/

/*
//-- Logical operators

const hasDriverLicense = true;
const hasGoodVision = true;

console.log(hasDriverLicense && hasGoodVision);
console.log(hasDriverLicense || hasGoodVision);
console.log(!hasDriverLicense);

// if (hasDriverLicense && hasGoodVision) {
//   console.log("Sarah is able to drive!");
// } else {
//   console.log("Someone else should drive...");
// }

const isTired = true;
console.log(hasDriverLicense && hasGoodVision && isTired);

if (hasDriverLicense && hasGoodVision && !isTired) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive...");
}
*/

/*
//-- Coding challenge #3

const scoreDolphins = (97 + 112 + 109) / 3;
const scoreKoalas = (109 + 95 + 50) / 3;
console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
  console.log("Dolphins win the trophy 🏆");
} else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
  console.log("Koalas win the trophy 🏆");
} else if (
  scoreKoalas === scoreDolphins &&
  scoreDolphins >= 100 &&
  scoreKoalas >= 100
) {
  console.log("Both win the trophy!");
} else {
  console.log("No one wins the trophy :/");
}
*/

/*
//-- Switch statement

const day = "thursday";

switch (day) {
  case "monday":
    console.log("Plan course");
    console.log("Code");
    break;
  case "tuesday":
    console.log("Prepare videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write book");
    break;
  case "friday":
    console.log("Record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy weekend :D");
  default:
    console.log("Not a valid day!");
}
*/

/*
//-- Ternary operator

const drink = age >= 18 ? "wine" : "water";
console.log(drink);
*/

/*
//-- Coding challenge #4

const bill = 40;
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);
*/
