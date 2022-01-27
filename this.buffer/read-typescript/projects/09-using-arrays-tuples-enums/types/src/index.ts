/****
//-- Working with Arrays

function calculateTax(amount: number): number {
  return amount * 1.2;
}

function writePrice(product: string, price: number): void {
  console.log(`Price for ${product}: $${price.toFixed(2)}`);
}

// the problem with this syntax is that it cannot be used in tsX files.
// let prices: Array<number> = [100, 75, 42];

let prices: number[] = [100, 75, 42];
let names: string[] = ["Hat", "Gloves", "Umbrella"];

// Array types can be inferred by the compiler. The compiler infers array types
// using the values used to populate the array when it is created. However, you
// should still annotate your arrays explicitly for several reasons: You might
// accidentally add a wrong type in the array expression, or you might create
// an empty array to be populated at a later point in code which would make the
// array have the any[] type.
// let prices = [100, 75, 42];
// let names = ["Hat", "Gloves", "Umbrella"];

// The strictNullChecks setting tells the compiler to restrict the use of null
// and undefined values and prevents the compiler from using "any" when inferring
// the type of an empty array. Instead, the compiler infers the "never" type,
// which means that nothing can be added to the array.
// let prices = [];
// prices.push(...[100, 75, 42, "20"]); // Error!
// let names = ["Hat", "Gloves", "Umbrella", "Sunglasses"];

// prices.forEach((price: number, index: number) => {
prices.forEach((price, index) => {
  writePrice(names[index], calculateTax(price));
});
*/

/****
//-- Working with tuples

function calculateTax(amount: number): number {
  return amount * 1.2;
}

function writePrice(product: string, price: number): void {
  console.log(`Price for ${product}: $${price.toFixed(2)}`);
}

// Tuples must be defined with type annotations; otherwise, the compiler will
// assume that a regular array with a type that is the union of each value
// used during initialization.
// let hat: [string, number] = ["Hat", 100];
// let gloves: [string, number] = ["Gloves", 75];

//-- At runtime, a tuple is implemented as a regular JavaScript array. This means
// tuples can be used with the standard JavaScript array features.

// hat.forEach((h: string | number) => {
//   if (typeof h === "string") {
//     console.log(`String: ${h}`);
//   } else {
//     console.log(`Number: ${h.toFixed(2)}`);
//   }
// });

// let [hatName, hatPrice] = hat;
// console.log(`Name: ${hatName}`);
// console.log(`Price: ${hatPrice.toFixed(2)}`);

//-- Tuples can be used just like any type.

// let products: [string, number][] = [
//   ["Hat", 100],
//   ["Gloves", 75]
// ];
// let tupleUnion: ([string, number] | boolean)[] = [
//   true,
//   false,
//   hat,
//   ...products
// ];

// tupleUnion.forEach((elem: [string, number] | boolean) => {
//   // Cannot use the typeof keyword to determine whether a value is a tuple.
//   // Tuples are implemented using standard JavaScript arrays, and the test for
//   // array types requires the instanceof keyword.
//   if (elem instanceof Array) {
//     let [str, num] = elem;
//     console.log(`Name: ${str}`);
//     console.log(`Price: ${num.toFixed(2)}`);
//   } else if (typeof elem === "boolean") {
//     console.log(`Boolean value: ${elem}`);
//   }
// });

//-- Tuples can contain optional elements, which are denoted by the question mark
// (the ? character). The tuple is still fixed-length, and the optional element
// will be undefined if no value has been defined.

// let hat: [string, number, number?] = ["Hat", 100];
// let gloves: [string, number, number?] = ["Gloves", 75, 10];

// [hat, gloves].forEach((tuple) => {
//   let [name, price, taxRate] = tuple;

//   // We use type guard in case the optional tuple element isn't provided.
//   if (taxRate !== undefined) {
//     price += price * (taxRate / 100);
//   }

//   writePrice(name, price);
// });

//-- Defining tuples with rest elements. This feature produces a variable-length
// tuple that lacks the rigidly defined structure of basic tuples. The only time
// this feature makes sense to use is when describing JavaScript code (ch 14).

let hat: [string, number, number?, ...number[]] = [
  "Hat",
  100,
  10,
  1.2,
  3,
  0.95
];
let gloves: [string, number, number?, ...number[]] = ["Gloves", 75, 10];

[hat, gloves].forEach((tuple) => {
  let [name, price, taxRate, ...coupons] = tuple;

  // We use type guard in case the optional tuple element isn't provided.
  if (taxRate !== undefined) {
    price += price * (taxRate / 100);
  }
  coupons.forEach((c) => (price -= c));

  writePrice(name, price);
});
*/

/****
//-- Using enums

function calculateTax(amount: number): number {
  return amount * 1.2;
}

function writePrice(product: string, price: number): void {
  console.log(`Price for ${product}: $${price.toFixed(2)}`);
}

//-- Enums are implemented entirely by the TypeScript compiler, relying on type
// checking during compilation and standard JavaScript features at runtime.
// Each enum value has a corresponding number value that is assigned automatically
// by the compiler and that starts at zero by default.

// enum Product {
//   Hat, // 0
//   Gloves, // 1
//   Umbrella // 2
// }

// [Product.Hat, Product.Gloves, Product.Umbrella].forEach((val) => {
//   console.log(`Number value: ${val}`);
// });

// let productValue: Product = 0;
// let productName: string = Product[productValue];
// console.log(`${productName}, ${productValue}`); // Hat, 0

// let products: [Product, number][] = [
//   [Product.Hat, 100],
//   [Product.Gloves, 75]
// ];

// products.forEach((prod: [Product, number]) => {
//   switch (prod[0]) {
//     case Product.Hat:
//       writePrice("Hat", calculateTax(prod[1]));
//       break;
//     case Product.Gloves:
//       writePrice("Gloves", calculateTax(prod[1]));
//       break;
//     case Product.Umbrella:
//       writePrice("Umbrella", calculateTax(prod[1]));
//       break;
//   }
// });

//-- Using specific enum values

// Caution: The compiler consults the previous value only when it generates a
// number value and doesn’t check to see whether the value has already been
// used, which can lead to duplicate values in an enum. So be careful when
// doing something like this:
// enum Product {
//   Hat, // 0
//   Gloves = 20,
//   Umbrella // 21
// }

enum OtherEnum {
  First = 10,
  Second = 20
}

// The compiler can evaluate simple expressions for enum values. These features
// can be useful, but close attention is required to avoid accidentally creating
// duplicate values or unexpected results. My advice is to keep enums simple and
// leave the compiler to generate numbers wherever possible.
// enum Product {
//   Hat = OtherEnum.First + 1, // 11
//   Gloves = 20,
//   Umbrella = Hat + Gloves // 31
// }

// let productValue: Product = 0;
// let productName: string = Product[productValue];
// console.log(`${productName}, ${productValue}`); // Hat, 0

// Using string enums
// enum City {
//   London = "London",
//   Paris = "Paris",
//   NY = "New York"
// }
// console.log(`City: ${City.London}`);

// Limitations of enums:

// - The compiler is excellent at checking types for enums, but it doesn’t do
// anything to ensure that legal number values are used. The compiler doesn’t
// prevent the assignment of a number to a variable whose type is an enum when
// the number doesn’t correspond to one of the enum values. this isn’t a problem
// with string enums, which are implemented differently behind the scenes and
// can be assigned values only from the enum.

// - The same issue arises if a function uses an enum as its result type because
// the compiler will allow it to return any number value. this isn’t a problem
// with string enums, which are implemented differently behind the scenes and
// can be assigned values only from the enum.

// - Testing types is done using the JavaScript typeof keyword, and since enums
// are implemented using JavaScript number values, typeof cannot be used to
// distinguish between enum and number values.

// let productValue: Product = Product.Hat;
// if (typeof productValue === "number") {
//   console.log("Value is a number");
// }
// let unionValue: number | Product = Product.Hat;
// if (typeof unionValue === "number") {
//   console.log("Value is a number");
// }

//-- Using constant enums: The TypeScript compiler creates an object that provides
// the implementation for an enum. In some applications, the performance impact
// of using the object can be a problem, and a different approach can be used
// instead. This is an advanced feature that is rarely required in most projects.

// To prevent the compiler from using an object to implement an enum, the const
// keyword can be used when the enum is defined in the TypeScript file. When the
// code is compiled, the compiler will inline each reference to the enum, meaning
// that the numeric value will be used directly.
const enum Product {
  Hat,
  Gloves,
  Umbrella
}

let productValue = Product.Hat;

// Const enums may offer a small performance improvement, but they do so by
// disabling the enum feature that allows a name to be looked up by value.
// There is a compiler option named preserveConstEnums that tells the compiler
// to generate the object even for const enums. this feature is only for
// debugging, and it doesn’t restore the lookup feature.
// let productName = Product[0]; // Error!
*/

/****
//-- Using literal value types

let restrictedValue: 1 | 2 | 3 = 3;
// let restrictedValue: 1 | 2 | 3 = 100; // Error!

let secondValue: 1 | 10 | 100 = 1;

restrictedValue = secondValue;
secondValue = 100;
// restrictedValue = secondValue; // Error!

console.log(`Value: ${restrictedValue}`);

//-- Using literal value types in functions & mixing value types

function calculatePrice(quantity: 1 | 2, price: number): number {
  return quantity * price;
}

let total = calculatePrice(2, 19.99);
console.log(`Price: ${total}`);

function getRandomValue(): 1 | 2 | 3 | 4 {
  return (Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4;
}

enum City {
  London = "LON",
  Paris = "PAR",
  Chicago = "CHI"
}

// function getMixedValue(): 1 | "Hello" | true | City.London {
//   switch (getRandomValue()) {
//     case 1:
//       return 1;
//     case 2:
//       return "Hello";
//     case 3:
//       return true;
//     case 4:
//       return City.London;
//   }
// }

// console.log(`Value: ${getMixedValue()}`);

// Literal value types can be used in type unions with regular types, creating
// combinations that permit specific values of one type with any legal values
// for another. For example, the type union "string | true | 3".

//-- Using overrides with literal value types: This isn’t a feature that you
// will need in most projects, but I have demonstrated it here to show that
// literal value types are handled just like regular types and because it is
// an interesting insight into the way that the TypeScript compiler works.

function getMixedValue(input: 1): 1;
function getMixedValue(input: 2 | 3): "Hello" | true;
function getMixedValue(input: 4): City.London;
function getMixedValue(input: number): 1 | "Hello" | true | City.London {
  switch (input) {
    case 1:
      return 1;
    case 2:
      return "Hello";
    case 3:
      return true;
    case 4:
    default:
      return City.London;
  }
}

let first = getMixedValue(1);
let second = getMixedValue(2);
let third = getMixedValue(4);
console.log(`${first}, ${second}, ${third}`);

//-- Using template literal string types: Literal string types can be used with
// the JavaScript template string feature to create template strings that only
// accept specific values, which can be a concise way to express complex
// combinations of values.

function getCityString(
  city: "London" | "Paris" | "Chicago"
): `City: ${"London" | "Paris" | "Chicago"}` {
  return `City: ${city}`;
}

// Inferred type of str: "City: London" | "City: Paris" | "City: Chicago".
// The compiler has used the literal value type to expand the string template
// into the complete set of strings that can be assigned to the str variable.
let str = getCityString("London");
console.log(str);
*/

//-- Using type aliases

function calculatePrice(quantity: 1 | 2, price: number): number {
  return quantity * price;
}

let total = calculatePrice(2, 19.99);
console.log(`Price: ${total}`);

type numVals = 1 | 2 | 3 | 4;

function getRandomValue(): numVals {
  return (Math.floor(Math.random() * 4) + 1) as numVals;
}

type cities = "London" | "Paris" | "Chicago";
type cityResponse = `City: ${cities}`;

function getCityString(city: cities): cityResponse {
  return `City: ${city}` as cityResponse;
}

let str = getCityString("London");
console.log(str);
