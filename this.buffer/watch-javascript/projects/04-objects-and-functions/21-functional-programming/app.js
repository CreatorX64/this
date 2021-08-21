// Although JavaScript sounds like it's related to the Java programming language
// and looks like the C++ family of languages a bit, it really has more in common
// in many ways with other languages called "functional programming languages".
// These functional programming languages include Lisp, Scheme, or ML. These are
// langauges that have first class functions, functions that behave as objects
// which you can pass as parameters, or return them from other functions. Having
// first class functions in the JavaScript programming language means that we can
// implement something called "functional programming" where we think and code in
// terms of functions. This introduces an entirely different way of thinking and
// implementing when programming. It introduces an approach that you simply can't
// do in other programming languages that don't have first class functions

// Below is a classical example of functional programming where we are using first
// class functions to our advantage to segment our code in cleaner and tighter ways,
// and this lets us build beautiful looking code that's straightforward to understand

function mapForEach(arr, fn) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(fn(arr[i]));
  }
  return newArr;
}

var arr1 = [1, 2, 3];
console.log(arr1);

var arr2 = mapForEach(arr1, function (item) {
  return item * 2;
});
console.log(arr2);

var arr3 = mapForEach(arr1, function (item) {
  return item > 2;
});
console.log(arr3);

var checkPastLimit = function (limiter, item) {
  return item > limiter;
};
var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1));
console.log(arr4);

// Both createCheckPastLimit functions achieve the same thing
var createCheckPastLimit = function (limiter) {
  return function (limiter, item) {
    return item > limiter;
  }.bind(this, limiter);
};
var createCheckPastLimit2 = function (limiter) {
  return function (item) {
    return item > limiter;
  };
};
var arr5 = mapForEach(arr1, createCheckPastLimit(1));
console.log(arr5);

// Instead of thinking purely in just separating your code into functions, you
// can start to think about how you can give your functions functions, or return
// functions from your functions in order to even greater simplify the code that
// you're writing over and over again. At first it may feel like it's stretching
// your brain a little bit to have all these functions flying around. But once
// you get used to it, it's very natural feeling to split things into functions,
// to pass them around to each other, because you're just splitting up the work
// in even finer, more minute, granular details than you might in other
// programming languages. This gives you an opportunity to really do some
// extraordinarily clean things

// One other note about functional programming is that your functions, especially
// the tiny ones that you move around and that do work, should do their best not
// mutate data. You can find yourself in odd circumstances when you're changing
// data in these tiny functions that you start to pass around. It's always better
// to mutate data as high in that chain of functions as possible, or to not change
// it at all and instead return something new

// First class functions and functional programming in JavaScript are really what
// takes JavaScript to the next level and it's what'll take you as a JavaScript
// programmer to the next level. Instead of using JavaScript the way you use other
// programming languages like PHP, Java, or whatever; you can use the full power of
// the language that's available to you that's not available in those other languages