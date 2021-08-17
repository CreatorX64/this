function greet(whatToSay) {
  return function (name) {
    console.log(whatToSay + " " + name);
  }
}

// greet("Hi")("Tony");

var sayHi = greet("Hi");
sayHi("Tony");

// A closure is the combination of a function bundled together (enclosed) with
// references to its surrounding state (the lexical environment). In other words,
// a closure gives you access to an outer function’s scope from an inner function.
// In JavaScript, closures are created every time a function is created, at
// function creation time. Closure isn't something that you create, type, or tell
// the JavaScript engine to do. The JavaScript engine creates the closure, we're
// just taking advantage of it. Closures are simply a feature of the JavaScript
// programming language. Let's say we have function that has a parameter or has
// a variable defined inside of it, and let's say that function has an inner
// function that makes use of the variable defined in the outer function. If we
// just call the inner function inside the outer function where it is defined,
// then a new execution context will be created and placed on top of the outer
// function's execution context. When the inner function executes the code that
// makes use of the variable defined in the outer function, the variable can be
// accesed from the inner function's execution context's outer lexical environment
// reference (the scope chain). But, instead of running the inner function inside
// the outer function that it was defined, let's say that we return it, and we run
// it after some point in time where the outer function has already returned and
// its execution context is gone. Then, when the inner function that was returned
// is run and the code that makes use of the variable defined in the outer function
// is ran, it will still work. This is because even though the outer function's
// execution context is gone, its execution context's variable environmetn is still
// kept around for the returned inner function to make use of. In effect, we say
// that the inner function's execution context has "closed in" on the variable
// environment that it would normally have reference to through scope chain even
// though its execution context is gone. So this phenomenon, of it closing in all
// the variables that it supposed to have access to, is called a "closure". So it
// doesn't matter when we invoke a function, we don't have to worry if its outer
// environments are still running. The JS engine will always make sure that whatever
// functions we are running, they will have access to the variables that its
// supposed to have access to, that their scope is intact. Understanding what's
// happening under the hood helps us to understand that closures aren't all that
// complicated, they're just a feature that make sure when you run a function, it
// works the way it supposed to.