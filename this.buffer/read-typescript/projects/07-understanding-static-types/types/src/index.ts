/*
//-- JavaScript is dynamically typed

let myVar;
console.log(`${myVar} = ${typeof myVar}`);
myVar = 12;
console.log(`${myVar} = ${typeof myVar}`);
myVar = "Hello";
console.log(`${myVar} = ${typeof myVar}`);
myVar = true;
console.log(`${myVar} = ${typeof myVar}`);
*/

/*
//-- Creating static types with a type annotation, using the "any" type

// const calculateTax = (amount: number): number => {
// const calculateTax = (amount: number) => {
// const calculateTax = (amount: any): any => {
const calculateTax = (amount): any => {
  // return amount * 1.2;
  // return (amount * 1.2).toFixed(2);
  return `$${(amount * 1.2).toFixed(2)}`;
};

// let price: number = 100;
// let taxAmount: number = calculateTax(price);
// let halfShare: number = taxAmount / 2;
let price = 100; // Implicitly typed as number
let taxAmount = calculateTax(price); // Implicitly typed as number
let halfShare = taxAmount / 2; // Implicitly typed as number

let personVal = calculateTax("Bob");

console.log(`Price: ${price}`);
console.log(`Full amount in tax: ${taxAmount}`);
console.log(`Half share: ${halfShare}`);
console.log(`Name: ${personVal}`);

// let newResult: any = calculateTax(200);
// let myNumber: number = newResult;
// console.log(`Number value: ${myNumber.toFixed(2)}`); // JS error!
*/

/*
//-- Using type unions

const calculateTax = (amount: number, format: boolean): string | number => {
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
};

let taxNumber: string | number = calculateTax(100, false);
let taxString: string | number = calculateTax(100, true);

console.log(`Number value: ${taxNumber.toFixed(2)}`); // Error
console.log(`String value: ${taxString.charAt(0)}`); // Error
*/

/*
//-- Using type assertions (also known as "type narrowing")

const calculateTax = (amount: number, format: boolean): string | number => {
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
};

// No type conversion is performed by a type assertion, which only tells the
// compiler what type it should apply to a value for the purposes of type checking.
let taxNumber = calculateTax(100, false) as number;
let taxString = calculateTax(100, true) as string;

// Error! The assertion must be to one of the types in the union.
// let taxBoolean = calculateTax(100, false) as boolean;

// To make it work, we can first assert to any and then to boolean. Not recommended!
let taxBoolean = calculateTax(100, false) as any as boolean;

// Alternative type assertion syntax. Cannot be used inside TSX files.
// taxString = <string>calculateTax(100, true);

console.log(`Number value: ${taxNumber.toFixed(2)}`);
console.log(`String value: ${taxString.charAt(0)}`);
console.log(`Boolean value: ${taxBoolean}`);
*/

/*
//-- Using a type guard

const calculateTax = (amount: number, format: boolean): string | number => {
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
};

let taxValue = calculateTax(100, false);

// if (typeof taxValue === "number") {
//   console.log(`Number value: ${taxValue.toFixed(2)}`);
// } else if (typeof taxValue === "string") {
//   console.log(`String value: ${taxValue.charAt(0)}`);
// }

switch (typeof taxValue) {
  case "number":
    console.log(`Number value: ${taxValue.toFixed(2)}`);
    break;
  case "string":
    console.log(`String value: ${taxValue.charAt(0)}`);
    break;
  default:
    let value: never = taxValue;
    console.log(`Unexpected type for value: ${value}`);
}
*/

/*
//-- Using the unkown type

const calculateTax = (amount: number, format: boolean): string | number => {
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
};

let taxValue = calculateTax(100, false);

switch (typeof taxValue) {
  case "number":
    console.log(`Number value: ${taxValue.toFixed(2)}`);
    break;
  case "string":
    console.log(`String value: ${taxValue.charAt(0)}`);
    break;
  default:
    let value: never = taxValue;
    console.log(`Unexpected type for value: ${value}`);
}

let newResult: unknown = calculateTax(200, false);
// let myNumber: number = newResult; // Error!
let myNumber: number = newResult as number;
console.log(`Number value: ${myNumber.toFixed(2)}`);
*/

//-- Using nullable types

const calculateTax = (
  amount: number,
  format: boolean
): string | number | null => {
  if (amount === 0) {
    return null;
  }
  const calcAmount = amount * 1.2;
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
};

// let taxValue: string | number | null = calculateTax(0, false);

// Using a non-null assertion. Non-null assertion should be used only when you
// know that a null value cannot occur.
// let taxValue: string | number = calculateTax(100, false)!;

// Removing null from a union with a type guard: This approach has the
// advantage of testing values at runtime.
// let taxValue: string | number | null = calculateTax(100, false);

// Using the definite assignment assertion. The TypeScript compiler isn’t able
// to determine the effect of the eval function and doesn’t realize that it
// assigns a value to taxValue. Because of strictNullChecks, we receive an
// error. That's why we use the definite assignment assertion. Note that use of
// "eval" is not recommended in real world projects. The definitive assignment
// assertion is a ! character, but it is applied after the name when the
// variable is defined, unlike the non-null assertion that is applied in expressions.
let taxValue!: string | number | null;
eval("taxValue = calculateTax(100, false)");

if (taxValue !== null) {
  let nonNullTaxValue: string | number = taxValue;

  switch (typeof taxValue) {
    case "number":
      console.log(`Number value: ${taxValue.toFixed(2)}`);
      break;
    case "string":
      console.log(`String value: ${taxValue.charAt(0)}`);
      break;
  }
} else {
  console.log("Value is not a string or a number");
}

// switch (typeof taxValue) {
//   case "number":
//     console.log(`Number value: ${taxValue.toFixed(2)}`);
//     break;
//   case "string":
//     console.log(`String value: ${taxValue.charAt(0)}`);
//     break;
//   default:
//     // Using typeof on null values returns object, so guarding against null
//     // values is done using an explicit value check, which the TypeScript
//     // compiler understands as a type guard.
//     if (taxValue === null) {
//       console.log("Value is null");
//     } else {
//       console.log(typeof taxValue);
//       let value: never = taxValue;
//       console.log(`Unexpected type for value: ${value}`);
//     }
// }

let newResult: unknown = calculateTax(200, false);
let myNumber: number = newResult as number;
console.log(`Number value: ${myNumber.toFixed(2)}`);
