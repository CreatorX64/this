// Idempotence just means that, given a set of values to a function, it should
// give back the same result with the same given values. This concept is very
// important and useful when it comes to parallel and/or distributed computation
// because it makes our code predictable. Note that a non-pure function can
// still be idempotent, so this is a concept independent from pure functions.

// Not idempotent
function notGood(num) {
  return Math.random(num);
}
console.log(notGood()); // Every time, we get something different
