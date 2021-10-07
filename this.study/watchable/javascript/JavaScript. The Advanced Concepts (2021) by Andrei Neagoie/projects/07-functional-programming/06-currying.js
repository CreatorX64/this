function multiply(a, b) {
  return a * b;
}

function curriedMultiply(a) {
  return function (b) {
    return a * b;
  };
}

curriedMultiply(5)(3);

const multiplyByFive = curriedMultiply(5);
multiplyByFive(4);
