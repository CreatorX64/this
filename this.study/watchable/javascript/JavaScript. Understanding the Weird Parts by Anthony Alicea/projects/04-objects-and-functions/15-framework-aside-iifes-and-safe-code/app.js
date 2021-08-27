// By wrapping our code in an IIFE, we make sure that our variables and
// functions are given memory in a brand new execution context. This means
// that our variables won't clash with variables outside of our code
(function (global, name) {
  var greeting = "Hello";
  
  // We could still affect the global context if we wanted to. We pass in
  // the global object as an argument because we might want to use this code
  // outside of the browser, maybe in Node, where the global object is not
  // the window. This pattern makes it intentional to mutate the global
  // object, in which case you know what you're doing and it is not an accident
  global.greeting = "Hello";
  
  console.log(greeting + " " + name);
}(window, "John"));

console.log(greeting);