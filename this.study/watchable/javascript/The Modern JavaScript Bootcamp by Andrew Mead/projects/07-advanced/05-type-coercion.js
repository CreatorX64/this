// Type Coercion: You can coerce to a string, a number, or a boolean.

// console.log("5" + 5);
// console.log("5" - 5);
// console.log(5 == "5");
// console.log(5 === "5");

// console.log(typeof 123);
// console.log(typeof 123.456);
// console.log(typeof "done");
// console.log(typeof true);
// console.log(typeof []);
// console.log(typeof {});
// console.log(typeof null);
// console.log(typeof undefined);
// console.log(typeof function() { });
// console.log(typeof (() => { console.log("")}));

const value = true + 12;
const type = typeof value;
console.log(type);
console.log(value);