// By value (primitives)

var a = 3;
var b;

b = a;
a = 2;

console.log(a, b);

// By reference (all objects, including functions)

var c = { greeting: "hi" };
var d;

d = c;
c.greeting = "hello";  // Mutate

console.log(c, d);

// By reference (even as parameters)

function changeGreeting(obj) {
  obj.greeting = "Hola";  // Mutate
}

changeGreeting(d);
console.log(c, d);

// Equals operator sets up new memory space (new address)

c = { greeting: "howdy" };
console.log(c, d);