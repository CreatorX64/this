function buildFunctions() {
  var arr = [];
  
  for (var i = 0; i < 3; i++) {
    arr.push(
      function () {
        // "i" is a "free variable". A free variable is a variable outside
        // a function but that you have access to
        console.log(i);
      }
    );
  }
  
  return arr;
}

var fs = buildFunctions();

// They all print "3", because they all still have a reference to the same
// outer lexical environment which includes the variable "i" with a value of "3"
fs[0]();  // Prints "3"
fs[1]();  // Prints "3"
fs[2]();  // Prints "3"


// What if we wanted the above lines to actually print 0, 1, 1? Using IIFEs in ES5

function buildFunctions2() {
  var arr = [];
  
  for (var i = 0; i < 3; i++) {
    arr.push(
      // Using an IIFE, we create a new execution context at each iteration
      // of the loop and the current iteration's value of "i" is added into the
      // variable environments of those execution contexts. Then, we return a
      // new function from that IIFE which references the variable "j" (that
      // holds the current iteration's value of "i") which is defined in it's
      // outer lexical environment. By doing so, we are effectively making
      // use of closures. The inner returned function closes in on the outer
      // IIFE's variable environment which holds the current iteration's value
      // of "i" in it (which is possible because we are immediately invoking
      // the outer function with the current iteration's value of "i")
      (function (j) {
        return function () {
          console.log(j);
        }
      }(i))
    );
  }
  
  return arr;
}

var fs2 = buildFunctions2();

fs2[0]();  // Prints "0"
fs2[1]();  // Prints "1"
fs2[2]();  // Prints "2"


// What if we wanted the above lines to actually print 0, 1, 1? Using let in ES6

function buildFunctions3() {
  var arr = [];
  
  // If we use "let", the variable "i" will have a block scope. So in each
  // iteration of the loop, a new variable "i" is created with a different
  // memory address. So when the anonymous function is run later, the anonymous
  // function's execution context's outer lexical environment reference will
  // point to the loop's block scope in it's specific iteration where the
  // function was created with the specific variable "i" at its specific
  // memory address
  for (let i = 0; i < 3; i++) {
    arr.push(
      function () {
        console.log(i);
      }
    );
  }
  
  return arr;
}

var fs3 = buildFunctions3();

fs3[0]();  // Prints "0"
fs3[1]();  // Prints "1"
fs3[2]();  // Prints "2"