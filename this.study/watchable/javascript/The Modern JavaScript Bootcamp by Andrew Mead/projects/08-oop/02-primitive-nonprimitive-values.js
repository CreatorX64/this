// Prototypal inheritance.

// Primitive values: Values that do not have properties, non-objects.
//   string, number, boolean, null, undefined

// Non-primitive values.
//   Object: myObject --> Object.prototype --> null
//   Array: myArray --> Array.prototype --> Object.prototype --> null
//   Function: myFunc --> Function.prototype --> Object.prototype --> null
//   String (primitive string wrapper): myString --> String.prototype --> Object.prototype --> null
//   Number (primitive number wrapper): myNumber --> Number.prototype --> Object.prototype --> null
//   Boolean (primitive boolean wrapper): myBoolean --> Boolean.prototype --> Object.prototype --> null

const product = "Computer";
console.log(product);

const otherProduct = new String("Phone");
console.log(otherProduct);