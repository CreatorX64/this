// Function statement
function greet(name) {
  console.log("Hello " + name);
}
greet("John");

// Function expression
var greetFunc = function (name) {
  console.log("Hello " + name);
};
greetFunc("John");

// Immediately Invoked Function Expression (IIFE)
var greeting = function (name) {
  return "Hello " + name;
}("John");
console.log(greeting);

// Standalone IIFE

3;  // No errors

"Hello";  // No errors

{ name: "John" };  // No errors

// SyntaxError! When the syntax parser sees the "function" keyword at the
// start of a brand new line/statement after the last semicolon, it expects
// this to be a function statement
// function (name) {
//   return "Hello " + name;
// }

// To trick the syntax parser into understanding that we don't intend the
// above function to be a function statement, we need to make sure the "function"
// keyword is not the first thing that the syntax parser sees. Becuase if the
// "function" keyword is the first thing it sees, then it expects a function
// statement and nothing else. The easiest and probably the best way to do this
// is to wrap the function expression in parentheses. Parentheses is an operator
// (grouping operator) in JS, so it accepts expressions inside of it. You never put
// statements inside of it. Because of this, when you put a function expression
// inside of parentheses, the syntax parses knows that you intend to use a function
// expression in there, so there aren't any errors.
(function (name) {
  var greeting = "Hello";
  console.log(greeting + " " + name);
});

// We can invoke the above function, thus giving us IIFE
var firstName = "John";
(function (name) {
  var greeting = "Inside IIFE: Hello";
  console.log(greeting + " " + name);
}(firstName));