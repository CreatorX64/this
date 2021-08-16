// Expressions

// a = 3;
// 1 + 2;
// a = { greeting: "hi" };

var anonymousGreet = function () {
  console.log("hi");
};

// Statements

// var a;
// var a = 2;

// if (a === 3) { }

function greet() {
  console.log("hi");
}

function log(a) {
  a();
}

log(function () { console.log("hi") });