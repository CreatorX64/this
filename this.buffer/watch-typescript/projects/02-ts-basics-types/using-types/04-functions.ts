// function add(n1: number, n2: number) {
function add(n1: number, n2: number): number {
  return n1 + n2; // Return type inferred "number".
  // return n1.toString() + n2.toString(); // Return type inferred "string".
}

// function printResult(num: number) {
// function printResult(num: number): undefined { // Error! Must explicity do "return;" in this case!
function printResult(num: number): void {
  console.log("Result: ", num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(5, 12));
// console.log(printResult(add(5, 12))); // undefined

// let combineValues: Function; // "Function" is an interface provided by TypeScript.
let combineValues: (n1: number, n2: number) => number; // This better and more specific than just "Function"
combineValues = add;
// combineValues = printResult; // Error!

console.log(combineValues(8, 8));

addAndHandle(10, 20, (result) => {
  console.log(result); // "result" is inferred as "number"
  return result; // No error! Callback functions can return something, even if the argument on which they're passed does NOT expect a returned value.
});
