// In TypeScript, a "type" gives us an easy way to refer to the different
// properties and functions that a value has. So instead of saying "the value
// 'abc' is a value that has all the properties and methods we assume that a
// string has which include length, charAt(), concat(), includes(), indexOf(),
// ...", we say that "the value 'abc' is a string"

// There are 7 primitive types in TypeScript, which include:
//   undefined, null, boolean, number, bigint, string, symbol

// Non-primitive types are all other types that are not primitive, which include:
//   objects, classes, arrays, functions

const today = new Date();
console.log(today.getMonth());

const person = { age: 20 };
console.log(person.age);

class Color { }
const red = new Color();