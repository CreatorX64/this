// Function.prototype.bind()

var person = {
  firstName: "John",
  lastName: "Doe",
  getFullName: function() {
    var fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
};

var logName = function(lang1, lang2) {
  console.log("Logged:", this.getFullName());
  console.log("Arguments:", lang1, lang2);
  console.log("");
}
// logName();  // TypeError: this.getFullName is not a function

// Note that we're not calling the logName function. We are using the function
// logName as an object, and calling a method on that object. The bind()
// function makes a copy of the function it is called on, sets up the copy so
// that whenever it's execution context is created by the JS engine, the JS engine
// will use the object passed into the bind function as the "this" keyword when
// it creates the this binding for the copy function's execution context
var logPersonName = logName.bind(person);
logPersonName();
logPersonName("en");

var logName2 = function(lang1, lang2) {
  console.log("Logged: " + this.getFullName());
}.bind(person);

// Function.prototype.call()

logName.call(person, "en", "es");

// Function.prototype.apply()

logName.apply(person, ["en", "es"]);

(function(lang1, lang2) {
  console.log("From IIFE");
  console.log("Logged:", this.getFullName());
  console.log("Arguments:", lang1, lang2);
  console.log("");
}.apply(person, ["en", "es"]));

// Use case: Function borrowing. You can grab methods from other objects and
// use them with any compatible object

var person2 = {
  firstName: "Jane",
  lastName: "Doe"
};

console.log(person.getFullName.apply(person2));

// Use case: Function currying

function multiply(a, b) {
  return a * b;
}

var multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4));

var multiplyByThree = multiply.bind(this, 3);
console.log(multiplyByThree(4));

var giveMeFour = multiply.bind(this, 2, 2);
console.log(giveMeFour());