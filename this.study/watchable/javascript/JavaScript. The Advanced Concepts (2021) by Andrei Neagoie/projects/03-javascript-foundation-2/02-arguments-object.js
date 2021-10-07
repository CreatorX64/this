function marry1(person1, person2) {
  console.log("arguments", arguments);
  console.log(Array.from(arguments));
  return `${person1} is now married to ${person2}`;
}

// The "arguments" object is not an exact array, that's why the JS engine
// cannot optimize code that makes use of it. Instead, you can now capture
// array arguments using the rest syntax.
function marry2(...args) {
  console.log("arguments", args);
  return `${args[0]} is now married to ${args[1]}`;
}

marry1("Tim", "Tina");
marry2("Tim", "Tina");
