"use strict";

//-- Constructor functions and the "new" operator

function Person(firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Instance methods: Never create them inside constructor functions! Each
  // method will be copied to each object that's created using this constructor
  // functions. Instead, attach your methods to the "prototype" property of
  // the constructor function.
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
}

// Four things happen when we call the constructor function:
//   1. New empty object is created
//   2. Person function is called, "this" is set to the object created in step 1
//   3. New object's "prototype" is linked to the "prototype" property of Person
//   4. Person function automatically returns the created object

const jonas = new Person("Jonas", 1991);
console.log(jonas);

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(matilda, jack);

const jay = "Jay";

console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); // false

//-- Prototypes

console.log(Person.prototype);

// There exists only one copy of calcAge, and that's on the prototype of Person.
// Every object created using Person will have access to this method through
// the "prototype chain".
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(Object.getPrototypeOf(jonas));
console.log(Object.getPrototypeOf(jonas) === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false
console.log(Object.prototype.isPrototypeOf(Person)); // true

// Static properties
Person.prototype.species = "Homo Sapiens";
console.log(jonas.species);
console.log(matilda.species);
console.log(jonas.hasOwnProperty("firstName")); // true
console.log(jonas.hasOwnProperty("species")); // false (the prop. is on Person)

//-- Prototypal inheritance on built-in objects

console.log(Object.getPrototypeOf(jonas)); // Person.prototype
console.log(Object.getPrototypeOf(Object.getPrototypeOf(jonas))); // Object.prototype
console.log(
  Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(jonas)))
); // null

console.dir(Person.prototype.constructor);
console.log(Person.prototype.constructor === Person); // true

const arr = [1, 2, 3, 3, 2, 2, 1, 5]; // new Array()
console.log(Object.getPrototypeOf(arr)); // Array.prototype
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(Object.getPrototypeOf(Object.getPrototypeOf(arr))); // Object.prototype

// This works, but it's not a good idea to add methods to the prototype of a
// built-in constructor function. The main reason for this is the next version
// of JavaScript might add a method with the same name and it might work in a
// different way. Secondly, if you're working with a team of developers, then
// multiple devs could implement the same method with different names or same
// name, thereby overriding each other's methods.
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

// HTMLHeadingElement => HTMLElement => Element => Node => EventTarget => Object
const h1 = document.querySelector("h1");
console.dir(h1);
console.log(Object.getPrototypeOf(h1)); // HTMLHeadingElement.prototype
console.log(Object.getPrototypeOf(Object.getPrototypeOf(h1))); // HTMLElement.prototype

// Function objects' prototype is Function.prototype
console.dir((x) => x + 1);

// Coding challenge #1

function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
