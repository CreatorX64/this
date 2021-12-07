/*
//-- In JavaScript, all numbers are stored as floating-point numbers.

console.log(23 === 23.0); // true

// Base 10: 0 - 9
// Base 2 (binary); 0, 1

// Since mathematical operations are done in binary, floating point arithmentic
// is not as precise as it is in base 10.
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
*/

/*
//-- Converting and checking numbers

console.log(Number("23"));
console.log(+"23");

// Parsing

console.log(Number.parseInt("30px")); // 30
console.log(Number.parseInt("30px", 10)); // 30 (second argument is radix, i.e. base N)
console.log(Number.parseInt("11px", 2)); // 3 (second argument is radix, i.e. base N)
console.log(Number.parseInt("m31")); // NaN (has to start with number)

console.log(Number.parseInt("  2.5rem    ")); // 2
console.log(Number.parseFloat("2.5rem  ")); // 2.5

// Number.isNaN() checks if a value is exactly NaN. Whereas the global isNan()
// first converts the passed value to number, then checks if the result is NaN.

console.log(Number.isNaN(20)); // false
console.log(Number.isNaN("20")); // false
console.log(Number.isNaN(Number("20X"))); // true
console.log(Number.isNaN(20 / 0)); // false (it is Infinity)

// Number.isFinite(): Check if a value is Inifity.

console.log(Number.isFinite(20 / 0)); // false

// In addition to checking for Infinity, Number.isFinite() can also be used to\
// check if a value is a number.
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite("20")); // false
console.log(Number.isFinite("20x")); // false
console.log(Number.isFinite(Number("20x"))); // false

// Number.isInteger(): Check if a value is integer.

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23.5)); // false
console.log(Number.isInteger(23 / 0)); // false
*/

/*
//-- Math and rounding

console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); // 2 (cubic root!)

console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, "23", 11, 2)); // 23 (converts items to numbers first)
console.log(Math.max(5, 18, "23px", 11, 2)); // NaN (no parsing)

console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Calculate the area of a circle, perhaps coming from the UI
console.log(Math.PI * Number.parseFloat("10px") ** 2);

// Random number between 1 and 6
console.log(Math.trunc(Math.random() * 6) + 1);

// Random number between any numbers
function randomInt(min, max) {
  if (min === max) {
    return min;
  } else if (min > max) {
    return null;
  }

  // Instead of trunc() we use floor() because floor() rounds down negative numbers correctly.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(10, 15));
console.log(randomInt(-15, -10));
console.log(randomInt(-15, 10));
console.log(randomInt(-10, 15));

// Rounding integers

console.log(Math.trunc(23.3)); // 23
console.log(Math.trunc(23.9)); // 23

console.log(Math.round(23.9)); // 24
console.log(Math.round(1.5)); // 2
console.log(Math.round(2.5)); // 3

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23
console.log(Math.floor("23.9")); // 23 (all these methods do type coercion)

// For positive numbers, trunc() and floor() do the same thing. But for
// negative numbers they differ slightly.
console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24

// Rounding decimals

// As an extra, toFixed() method rounds & converts to string. Calling this
// method on numbers will cause JavaScript to do boxing (converts the primitive
// value to a Number object, does the requested operation, then converts it
// back to primitive)
console.log((2.7).toFixed(0)); // 3
console.log((2.7).toFixed(3)); // 2.700
console.log((2.345).toFixed(2)); // 2.35
console.log(Number((2.345).toFixed(2))); // 2.35 (number)
*/

/*
//-- Remainder operator (modulus)

console.log(5 % 2); // 1
console.log(8 % 3); // 2
console.log(6 % 2); // 0 (checking for event)
console.log(7 % 2); // 1 (checking for odd)

function isEven(n) {
  return n % 2 === 0;
}

console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener("click", () => {
  [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = "orangered";
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = "blue";
    }
  });
});
*/

/*
//-- Numeric separators (ES2021)

const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99; // cents
console.log(price);

const transferFee = 15_00; // cents

// const PI = 3._1415; // Error! Can only be placed between digits

console.log(Number("230_000")); // NaN (doesn't work with strings)
console.log(Number.parseInt("230_000")); // 230 (doesn't work with strings)
*/

/*
//-- BigInt (ES2020)

// Biggest number JavaScript can safely represent
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(2 ** 53 + 123); // Incorrect result is given becasue precision is lost

console.log(2349203840923849023849023);
console.log(2349203840923849023849023n); // BigInt

// We can also use the BigInt(), but note that the value passed into the
// function will first be treated as a regular number (which means it'll
// lose precision before going into the function), then that value will be
// converted to BigInt. So this function shouldn't be used with large values.
console.log(BigInt(2349203840923849023849023)); // BigInt

// Operations

console.log(10000n + 10000n); // 20000n

const huge = 309284039849023894n;
const num = 23;
// console.log(huge * num); // TypeError: Cannot mix BigInt and other types, use explicit conversions
// console.log(Math.sqrt(16n)); // TypeError: Cannot convert a BigInt value to a number
console.log(huge * BigInt(num));

// Logical operators are an exception to the above
console.log(20n > 15); // true
console.log(20n === 20); // false! because === doesn't do type coercion
console.log(20n == 20); // true
console.log(typeof 20n); // bigint

console.log(huge + " is really big!");

// Divisions
console.log(10n / 3n); // 3n (no decimal parts)
*/
