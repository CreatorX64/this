"use strict";

//-- Default parameters
/*
const bookings = [];

const createBooking = (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers // Only works with params that come before.
) => {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);

createBooking("LH123", undefined, 5);
*/

/*
//-- How passing arguments work: Value vs. Reference

const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 234923874
};

const checkIn = (flightNum, passenger) => {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

  if (passenger.passport === 234923874) {
    console.log("Checked in!");
  } else {
    console.log("Wrong passport!");
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = (person) => {
  person.passport = Math.trunc(Math.random() * 1000000);
};

newPassport(jonas);
checkIn(flight, jonas);
*/

/*
//-- First class functions and higher-order functions

// Functions accepting callback functions

const oneWord = (str) => {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = (str) => {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

const transformer = (str, fn) => {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);

const high5 = () => {
  console.log("🖐");
};
document.body.addEventListener("click", high5);
["Jonas", "Martha", "Adam"].forEach(high5);

// Functions returning functions

const greet = (greeting) => (name) => {
  console.log(`${greeting} ${name}`);
};

const greeterHey = greet("Hey");
greeterHey("Jonas");
greeterHey("Steven");
greet("Hello")("Jonas");

const greetArr = (greeting) => (name) => {
  console.log(`${greeting} ${name}`);
};
greetArr("Hi")("Jonas");
*/

/*
//-- The call(), apply(), and bind() methods

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  }
};

lufthansa.book(239, "Jonas Schmedtmann");
lufthansa.book(635, "John Smith");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: []
};

const book = lufthansa.book;

book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: []
};

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);

const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// The bind() method

const bookEw = book.bind(eurowings);
const bookLh = book.bind(lufthansa);
const bookLx = book.bind(swiss);

bookEw(23, "Steven Williams");

const bookEw23 = book.bind(eurowings, 23);
bookEw23("Jonas");
bookEw23("Martha");

// With event listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  ++this.planes;
  console.log(this.planes);
};

document.body.addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23);

console.log(addVat(100));
console.log(addVat(23));

const addTax2 = (rate) => (value) => value + value * rate;
const addVat2 = addTax2(0.23);
console.log(addVat2(100));
console.log(addVat2(23));
*/

/*
//-- Coding challenge #1

const poll = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0), // [0, 0, 0, 0]
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );

    typeof answer === "number" &&
      answer < this.answers.length &&
      ++this.answers[answer];

    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  }
};

const btn = document.createElement("button");
btn.textContent = "Answer poll";
document.body.appendChild(btn);

btn.addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
*/

/*
//-- Immediately invoked function expressions (IIFE)

(function () {
  console.log("This will never run again");
  const isPrivate = 23;
})();
// console.log(isPrivate); // ReferenceError

(() => console.log("This will ALSO never run again"))();

// A modern alternative to IIFEs in terms of scoping variables is to just
// declare a block and use let & cost for all variables inside it. However,
// IIFEs are still way to go if you want to execute a function only once,
// perhaps in conjuction with async/await.

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate); // ReferenceError
*/

/*
//-- Closures

const secureBooking = () => {
  let passengerCount = 0;
  return () => {
    ++passengerCount;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);
*/

/*
//-- Closures example

// Example 1

let f;

const g = () => {
  const a = 23;
  f = () => {
    console.log(a * 2);
  };
};

const h = () => {
  const b = 777;
  f = () => {
    console.log(b * 2);
  };
};

g();
f(); // 46
console.dir(f);

h();
f(); // 1554
console.dir(f);

// Example 2

const boardPassengers = (n, wait) => {
  const perGroup = n / 3;

  setTimeout(() => {
    console.log(`We are now boarding all ${n} passengers!`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds...`);
};

const perGroup = 1000; // The closure has priority over global scope.
boardPassengers(180, 3);
*/

/*
//-- Coding challenge #2

(() => {
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.body.addEventListener("click", () => {
    header.style.color = "blue";
  });
})();
*/
