// JSON is technically a subset of JavaScript object literal syntax. Every
// JSON is a valid object literal syntax, but not every object literal syntax
// is valid JSON. Object literal syntax properties can be wrapped in quotes,
// or without quotes. In JSON, every propert must be wrapped in quotes

var objectLiteral = {
  firstName: "Mary",
  isProgrammer: true
};

var objectLiteralValidLikeJSON = {
  "firstName": "Mary",
  "isProgrammer": true
};

console.log(objectLiteral);
console.log(JSON.stringify(objectLiteral));

var objFromJSON = JSON.parse("{\"firstName\": \"Mary\", \"isProgrammer\": true}")
console.log(objFromJSON);