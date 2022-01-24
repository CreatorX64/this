/*
//-- Redefining functions

// function calculateTax(amount) {
//   return amount * 1.2;
// }

// Error! Cannot redeclare function in TS even if the second function has
// different paramaters (count or type) & different return type.
// function calculateTax(amount, discount) {
//   return calculateTax(amount) - discount;
// }

// The practical effect of not being able to overload functions is that
// different names must be used (such as calculateTax and
// calculateTaxWithDiscount, for example) or a single function adapts its
// behavior based on its parameters.
function calculateTax(amount, discount) {
  return amount * 1.2 - discount;
}

let taxValue = calculateTax(100, 0);
console.log(`Total amount: ${taxValue}`);
*/

/*
//-- Understanding function parameters

function calculateTax(amount, discount) {
  return amount * 1.2 - discount;
}

let taxValue = calculateTax(100, 0);
console.log(`2 args: ${taxValue}`);
taxValue = calculateTax(100); // Error!
console.log(`1 arg: ${taxValue}`);
taxValue = calculateTax(100, 10, 20); // Error!
console.log(`3 args: ${taxValue}`);
*/

/*
//-- Using optional parameters

// Optional parameters must be defined after the required parameters.
function calculateTax(amount, discount?) {
  return amount * 1.2 - (discount || 0);
}

let taxValue = calculateTax(100, 0);
console.log(`2 args: ${taxValue}`);
taxValue = calculateTax(100);
console.log(`1 arg: ${taxValue}`);
*/

/*
//-- Using a parameter with default value

// A parameter with a default value is known as a default-initialized parameter.
// parameters with default values are still optional parameters, even though no
// question mark is used, and must be defined after the function’s required parameters.
function calculateTax(amount, discount = 0) {
  return amount * 1.2 - discount;
}

let taxValue = calculateTax(100, 0);
console.log(`2 args: ${taxValue}`);
taxValue = calculateTax(100);
console.log(`1 arg: ${taxValue}`);
*/

/*
//-- Using a rest parameter

// A function can have one rest parameter only, and it must be the last parameter.
// Note: Type annotations for optional parameters are applied after the question
// mark, like this: "discount?: number".
function calculateTax(
  amount: number,
  discount: number = 0,
  ...extraFees: number[]
) {
  return (
    amount * 1.2 - discount + extraFees.reduce((total, val) => total + val, 0)
  );
}

let taxValue = calculateTax(100, 0);
console.log(`2 args: ${taxValue}`);
taxValue = calculateTax(100);
console.log(`1 arg: ${taxValue}`);
taxValue = calculateTax(100, 10, 20);
console.log(`3 args: ${taxValue}`);
taxValue = calculateTax(100, 10, 20, 1, 30, 7);
console.log(`6 args: ${taxValue}`);
*/

/*
//-- Controlling null parameter values

// If the null value is used for a default-initialized parameter, then its
// default value is used, as though the function had been called without an
// argument. But for required parameters, the function receives the null value,
// which can lead to unexpected results.
function calculateTax(
  // amount: number,
  amount: number | null,
  discount: number = 0,
  ...extraFees: number[]
) {
  if (amount != null) {
    return (
      amount * 1.2 - discount + extraFees.reduce((total, val) => total + val, 0)
    );
  }
}

// If strictNullChecks isn't enabled in config, the null value is coerced to the
// number 0 by the multiplication operator silently.
let taxValue = calculateTax(null, 0);
console.log(`Tax value: ${taxValue}`);
*/

/*
//-- Understanding function results

// The TypeScript compiler will try to infer the result type from the code in
// the function and will automatically use type unions if a function can return
// multiple types.
function calculateTax(
  amount: number | null,
  discount: number = 0,
  ...extraFees: number[]
) {
  if (amount != null) {
    return (
      amount * 1.2 - discount + extraFees.reduce((total, val) => total + val, 0)
    );
  } else {
    // Disabling implicit returns ensures that functions have to be explicit
    // about the results they produce.
    return undefined;
  }
}

let taxValue = calculateTax(null, 0);
console.log(`Tax value: ${taxValue}`);
*/

/*
//-- Using type annotations for function results

// The compiler infers a function result type by analyzing the code paths and
// creating a union of the types it encounters. I prefer to use a type annotation
// to explicitly specify the result type because it allows me to declare what I
// intended the function result to be, rather than what the code produces,
// ensuring that I do not accidentally use the wrong type.
function calculateTax(
  amount: number,
  discount: number = 0,
  ...extraFees: number[]
): number {
  return (
    amount * 1.2 - discount + extraFees.reduce((total, val) => total + val, 0)
  );
}

// Functions that do not produce results are declared using the "void" type.
// Using void ensures that the compiler will warn you if the result keyword
// is used or if the function is used to assign a value.
function writeValue(label: string, value: number): void {
  console.log(`${label}: ${value}`);
}

let taxValue = calculateTax(100, 0);
console.log(`Tax value: ${taxValue}`);

writeValue("Tax value", calculateTax(100, 0));

// Note: The never type can be used as the result type for functions that will
// never complete, such as functions that will always throw an exception.
*/

/*
//-- Overloading function types

// The information provided by the type unions is correct but does not fully
// describe the situation. What’s missing is the relationship between the
// parameter and result types: the function will always return a number result
// if the amount parameter is a number parameter and will always return null
// if amount is null. The missing details in the function’s types mean that
// the user of the function has to use a type guard on the result to remove
// null values, even though the value 100 is a number and will always produce
// a number result.
// function calculateTax(amount: number | null): number | null {
//   if (amount !== null) {
//     return amount * 1.2;
//   }
//   return null;
// }

// To describe the relationships between the types used by a function, TypeScript
// supports "type overloads". This is not the function overloading supported by
// languages such as C# and Java. only the type information is overloaded by this
// feature for the purposes of type checking. Only one implementation of the
// function exists, which is still responsible for dealing with all the types
// used in the overloads.
function calculateTax(amount: number): number;
function calculateTax(amount: null): null;
function calculateTax(amount: number | null): number | null {
  if (amount !== null) {
    return amount * 1.2;
  }
  return null;
}

function writeValue(label: string, value: number): void {
  console.log(`${label}: ${value}`);
}

let taxAmount: number = calculateTax(100);
writeValue("Tax value", taxAmount);

// The following code is not needed when we use type overload for our function.
// let taxAmount: number | null = calculateTax(100);
// if (typeof taxAmount === "number") {
//   writeValue("Tax value", taxAmount);
// }

// Note: You can also express the relationship between parameters and results
// using the conditional types feature, which is described later (ch 13).
*/

//-- Understanding assert functions: An assert function is one that evaluates
// an expression condition and, typically, throws an error if the result isn’t
// true. Assert functions are sometimes used as type guards in pure JavaScript,
// where the static types of TypeScript are not available. The problem with
// asset functions is that the TypeScript compiler cannot infer the effect of
// the assert function on types.

// The problem with this code is that the TypeScript compiler doesn’t understand
// that the check function means that only number values will be processed.
// function check(expression: boolean) {
//   if (!expression) {
//     throw new Error("Expression is false");
//   }
// }

// The asserts keyword can be used to denote an assert function, which lets the
// TypeScript compiler take the function into account.
function check(expression: boolean): asserts expression {
  if (!expression) {
    throw new Error("Expression is false");
  }
}

// There is a variation for assert functions that operate on types directly,
// rather than just evaluating an expression.
function checkNumber(val: unknown): asserts val is number {
  if (typeof val !== "number") {
    throw new Error("Not a number");
  }
}

function calculateTax(amount: number | null): number {
  check(typeof amount === "number");
  // checkNumber(amount);
  return amount * 1.2;
}

let taxAmount: number = calculateTax(100);
console.log(`Tax value: ${taxAmount}`);
