// No side effects
// Input --> Output

const array = [1, 2, 3];

// function mutateArray(arr) {
//   arr.pop(); // Side effect!
// }
// mutateArray(array);
// console.log(array); // [1, 2]

function removeLastItem(arr) {
  const newArray = [].concat(arr);
  newArray.pop(); // No side effects!
  return newArray();
}
console.log(removeLastItem(array)); // [1, 2]
console.log(array); // [1, 2, 3]

function multiplyBy2(arr) {
  return arr.map((item) => item * 2); // No side effects!
}
console.log(multiplyBy2(array)); // [2, 4, 6]
console.log(array); // [1, 2, 3]

// function a() {
//   console.log("hi"); // Side effect! It affects outside environment.
// }

function b(num1, num2) {
  return num1 + num2; // No side effects!
}
// This function always returns the same result given the same values. This
// concept is called "referential transparency". An expression is called
// referentially transparent if it can be replaced with its corresponding
// value (and vice-versa) without changing the program's behavior.
b(2, 3);

// Pure functions are very easy to test, very easy to compoese, and they avoid
// a lot of bugs. Because they have no mutations and no shared state, we have these
// predictable functions that minimize the bugs in our code. In functional programming,
// a function should have the following qualities:
//   - 1 Task
//   - return statement
//   - Pure
//   - No shared state
//   - Immutable state
//   - Composable
//   - Predictable
