// In partial application, we expect the rest of the arguments to be passed on
// the second call (so the call right after bind()). However, in currying, we
// expect one argument at a time.

function multiply(a, b) {
  return a * b;
}

const partialMultiplyByFive = multiply.bind(null, 5);
partialMultiplyByFive(10);
