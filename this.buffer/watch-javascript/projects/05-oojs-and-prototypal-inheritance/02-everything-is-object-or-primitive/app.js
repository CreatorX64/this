var a = {};
var b = function () {};
var c = [];

// Object.getPrototypeOf() is the standard implementation of the old and
// deprecated object.__proto__ property. However it is a read-only method

console.dir(Object.getPrototypeOf(a));  // Object.prototype
console.dir(Object.getPrototypeOf(b));  // Function.prototype
console.dir(Object.getPrototypeOf(c));  // Array.prototype

// This is the "prototypal chain"
console.dir(Object.getPrototypeOf(Object.getPrototypeOf(b)));  // Object.prototype
console.dir(Object.getPrototypeOf(Object.getPrototypeOf(c)));  // Object.prototype