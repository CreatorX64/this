// The comparison operators are left associative, some of them coerce types
// of the operands.
console.log(3 < 2 < 1);  // true
console.log(false < 1);  // The above statement becomes this
console.log(0 < 1);  // The above statement becomes this

// The "==" operator coerces the types of values when doing comparison.
console.log(3 == 3);  // true
console.log("3" == 3);  // true
console.log(false == 0);  // true
console.log("" == 0);  // true
console.log("" == false);  // true
// Even though "null" coerces to 0 with the "<" operator or when called with
// Number(null), the statement with "==" returns "false". Thus, the "==" operator
// causes confusion and is considered as a negative part of the language in
// that it causes strange errors because of the unexpected ways in which it behaves.
console.log(Number(null));  // 0
console.log(null < 1);  // true
console.log(null == 0);  // false

// The strict equality/inequality operators solve the problems described above.
// These compare two things but doesn't try to coerce the types of operands.
console.log(3 === 3);  // true
console.log("3" === "3");  // true
console.log("3" === 3);  // false
console.log(false === 0);  // false
console.log(false !== 0);  // true