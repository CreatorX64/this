// First class functions, function expressions, and closures in callbacks
function sayHiLater() {
  var greeting = "Hi!";
  setTimeout(function () {
    console.log(greeting);
  }, 3000);
}

sayHiLater();

// jQuery also uses first class functions and function expressions
// $("button").click(function() { });

// A function that makes use of callbacks
function tellMeWhenDone(callback) {
  var a = 1000;
  var b = 2000;
  callback();
}

tellMeWhenDone(function() {
  console.log("I am done!");
});

tellMeWhenDone(function() {
  console.log("All done...");
});