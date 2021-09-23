class Person {
  constructor(fullName = "Anonymous", age = 0) {
    this.fullName = fullName;
    this.age = age;
  }

  getGreeting() {
    return `Hi. I am ${this.fullName}!`;
  }

  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

class Student extends Person {
  constructor(fullName, age, major) {
    super(fullName, age);
    this.major = major;
  }

  hasMajor() {
    return !!this.major;
  }

  getDescription() {
    let description = super.description();

    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }

    return description;
  }
}

class Traveler extends Person {
  constructor(fullName, age, homeLocation) {
    super(fullName, age);
    this.homeLocation = homeLocation;
  }

  getGreeting() {
    let greeting = super.getGreeting();

    if (this.homeLocation) {
      greeting += ` I'm visiting from ${this.homeLocation}.`;
    }

    return greeting;
  }
}

const me = new Traveler("Andrew Mead", 26, "Philadelphia");
console.log(me.getGreeting());

const other = new Traveler(undefined, undefined, "Nowhere");
console.log(other.getGreeting());
