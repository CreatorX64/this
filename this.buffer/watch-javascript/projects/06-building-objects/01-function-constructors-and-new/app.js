// In the last section we saw the wrong way of creating an object and assigning
// its prototype (using __proto__). Here, we'll see the correct ways of creating
// an object and setting up its prototype

// Just as the name "JavaScript" was a marketing strategy to attract Java
// developers, the "new" keyword was designed to achieve a similar thing, because
// "new" in JavaScript is nothing like "new" in other languages like Java

// In JavaScript, "new" is an operator. When we use "new", the following happens:
// An empty object is created, the function to the right of the "new" operator is
// called, the empty object is set as the "this" binding inside the new execution
// context created by the function operand, the new object's prototype is set to a
// reference that points to the function constructor's "prototype" property (which
// we look at in the next section), and as long as the function operand
// doesn't return a value the object created by the "new" operator will be
// returned from that function. If we explicitly return a value from that function,
// the whole process will be cancelled and your returned object will be the result of
// calling the function with the new operator. Apart from these special behaviors,
// function constructors are just functions, so you can for instance pass parameters
// to it in order to set properties of the new object

// So in essence, the "new" operator makes the new object and function constructors
// are used for adding properties and methods to that new object

// This is a "function constructor"
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

var john = new Person("John", "Doe");
console.log(john);

var jane = new Person("Jane", "Doe");
console.log(jane);

// Caution: If you forget to put the "new" keyword before the function constructors,
// those function constructors will act as pure JavaScript functions. Since you don't
// return anything in them, they will effectively return a value of undefined. You
// can avoid this error by following a simple convention: Begin the identifiers of
// constructor functions with a capital letter, like "Person", so that the constructor
// functions will stand out and it will be easier to remember that you need to put
// the "new" operator. Also, some linters check your code by relying on this convention

// There are new ways that are coming in JavaScript to create objects. So function
// constructors are likely be going away, not entirely because we still need to support
// old browsers/runtimes