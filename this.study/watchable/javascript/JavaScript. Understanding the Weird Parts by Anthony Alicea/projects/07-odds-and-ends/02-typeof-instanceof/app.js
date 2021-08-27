// typeof is an operator (and remember all operators are just special
// functions) that takes in a value and returns a string that includes the type
// of the value passed in

var a = 3;
console.log(typeof a); // number

var b = "Hello";
console.log(typeof b); // string

var c = {};
console.log(typeof c); // object

var d = [];
console.log(typeof d); // object
console.log(d.toString()); // (nothing gets printed because array is empty)
// Call the toString not defined on the Array.prototype, but defined on the
// Object.prototype down in the prototype chain
console.log(Object.prototype.toString.call(d)); // [object Array]

function Person(name) {
  this.name = name;
}

var e = new Person("Jane");
console.log(typeof e); // object

console.log(typeof undefined); // undefined

// This is a bug, but hasn't been fixed for backwards compatibility
console.log(typeof null); // object

const z = function () {};
console.log(typeof z); // function

// instanceof returns true if anywhere down the prototype chain of object "e"
// we find a reference to Person.prototype

console.log(e instanceof Person); // true
