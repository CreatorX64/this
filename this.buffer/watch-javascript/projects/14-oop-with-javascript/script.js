"use strict";

/*
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
*/

/*
//-- ES6 classes

// Class expression
// We can use the class keyword as an expression because classes are functions
// behind the scenes, unlike other programming languages.
// const Person = class { };

// Class declaration
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to Person.prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log("Hey there 👋");
    console.log(this);
  }
}

const jessica = new Person("Jessica Davis", 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(Object.getPrototypeOf(jessica) === Person.prototype); // true

// We can still add methods to the prototype manually, becuase Person is a
// function under the hood
// Person.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// Other important things:

// 1. Classes are NOT hoisted.
// 2. Classes are first-class citizens (because they are special kinds of
//    functions behind the scenes).
// 3. Classes are executed in strict mode, even if we don't activate it.

//-- Setters and getters

const account = {
  owner: "jonas",
  movements: [200, 530, 120, 300],
  // It is not mandatory to have both a getter and a setter, they can exist in isolation.
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(value) {
    this.movements.push(value);
  }
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);

const walter = new Person("Walter White", 1965);

//-- Static methods

// Array.from(document.querySelectorAll("h1"));
// Number.parseFloat("12px");

// Person.hey = function () {
//   console.log("Hey there 👋");
//   console.log(this);
// };

Person.hey(); // "this" is the Person constructor function (class) itself

//-- Object.create(): Apart from constructor functions and ES6 classes, this
// is the third way of implementing prototypal inheritance/delegation. However,
// this is the least common way of creating prototypal inheritance. This method
// creates a brand new object that has a prototype which points to the object
// that was passed into the method.

const personProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  // This is NOT a constructor function! It's just a method we define to help
  // us assign object properties.
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
};

const steven = Object.create(personProto);
steven.name = "Steven";
steven.birthYear = 2002;
console.log(steven);
steven.calcAge();

console.log(Object.getPrototypeOf(steven) === personProto); // true

const sarah = Object.create(personProto);
sarah.init("Sarah", 1979);
console.log(sarah);
sarah.calcAge();
*/

/*
//-- Coding challenge #2

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car("Ford", 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);
*/

/*
//-- Ineritance between "classes": Constructor functions

// Person constructor
function Person(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Student contructor
function Student(firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
}

// Linking prototypes
Student.prototype = Object.create(Person.prototype);
Object.defineProperty(Student.prototype, "constructor", {
  value: Student,
  enumerable: false,
  writable: true
});

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();
mike.calcAge();

console.log(Object.getPrototypeOf(mike)); // Student
console.log(Object.getPrototypeOf(Object.getPrototypeOf(mike))); // Person

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true
*/

/*
//-- Coding challenge #3

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

function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);
Object.defineProperty(EV.prototype, "constructor", {
  value: EV,
  enumerable: false,
  writable: true
});

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// Method overriding
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();
*/

/*
//-- Ineritance between "classes": ES6 classes

class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log("Hey there 👋");
    console.log(this);
  }
}

class Student extends Person {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);

    // If Student didn't have any of it's own properties (i.e. "course"), we
    // wouldn't need a constructor at all in this case.
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new Student("Martha Jones", 2012, "Computer Science");

console.log(martha);
martha.introduce();
martha.calcAge();
*/

/*
//-- Ineritance between "classes": Object.create()

// Create Person prototype
const personProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
};

// Create Student prototype by inheriting from Person
const studentProto = Object.create(personProto);

studentProto.init = function (firstName, birthYear, course) {
  personProto.init.call(this, firstName, birthYear);
  this.course = course;
};

studentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// Create a Student object
const jay = Object.create(studentProto);

jay.init("Jay", 2010, "Computer Science");
console.log(jay);
jay.introduce();
jay.calcAge();
*/

/*
//-- Another class example

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.locale = navigator.language;
    this._pin = pin; // Fake private property (technically not "fake private", but "fake protected")
    this._movements = []; // Fake private property (technically not "fake private", but "fake protected")

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  _approveLoan(amount) {
    return true;
  }

  // Public interface of our objects

  getMovements() {
    return [...this._movements];
  }

  deposit(amount) {
    this._movements.push(amount);
  }

  withdraw(amount) {
    this.deposit(-amount);
  }

  requestLoan(amount) {
    if (this._approveLoan(amount)) {
      this.deposit(amount);
      console.log(`Load approved`);
    }
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);

// acc1._movements.push(250);
// acc1._movements.push(-140);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000); // We don't want this method to be publicly available
console.log(acc1.getMovements());

console.log(acc1);
console.log(acc1._pin); // We don't want this property to be publicly available

// So, we need data encapsulation and privacy. However, JS doesn't yet support
// real data encapsulation and privacy. There's a proposal, but it's not ready
// yet. So for now, we can fake encapsulation by simply following a convention.
*/

/*
//-- Encapsulation: Truly private class fields and methods (using the "Class Fields"
// proposal, which is at Stage 3): https://github.com/tc39/proposal-class-fields

// In this proposal, there are 8 different kinds of fields, but we'll focus on
// only 4 different types of fields:
//   1) Public fields
//   2) Private fields
//   3) Public methods
//   4) Private methods
//   5, 6, 7, 8) "static" version of the above

class Account {
  // 1) Public fields (added to all new instances)
  locale = navigator.language;

  // 2) Private fields (added to all new instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // 3) Public methods, which are the same as before

  getMovements() {
    return [...this.#movements];
  }

  deposit(amount) {
    this.#movements.push(amount);
    return this;
  }

  withdraw(amount) {
    this.deposit(-amount);
    return this;
  }

  requestLoan(amount) {
    if (this._approveLoan(amount)) {
      this.deposit(amount);
      console.log(`Loan deposited!`);
      return this;
    }
  }

  // 4) Private methods (these are not really implemented as they should be in
  // any browser. For instance, Chrome adds these as private fields to the
  // instance and not to the prototype, which is not how it is supposed to happen).
  // #approveLoan(amount) {
  //   console.log("Approved!");
  //   return true;
  // }

  _approveLoan(amount) {
    console.log("Loan approved!");
    return true;
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);

// console.log(acc1.#movements); // Cannot access private field!
// console.log(acc1.#pin); // Cannot access private field!

// acc1.#approveLoan(123); // Cannot access private method!

// Chanining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
*/

/*
//-- Coding challenge #4

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this; // Chainable method
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EV extends Car {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this; // Chainable method
  }

  // Method overriding
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this; // Chainable method
  }
}

const rivian = new EV("Rivian", 120, 23);

console.log(rivian);
// console.log(rivian.#charge); // Can't access private field!

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
*/
