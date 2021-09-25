// Compose: Any sort of data transformation that we do should be obvious, kind
// of like a conveyor belt in a factory.
//
//   data --> fn --> data --> fn --> ...
//
// Composability is a system design principle that deals with the relationship
// between software components. A highly composable system provides components
// that can be selected and assembled in various combinations, just like an
// assembly line.

function compose(f, g) {
  return function (data) {
    return f(g(data));
  };
}

function multiplyByThree(num) {
  return num * 3;
}

function makePositive(num) {
  return Math.abs(num);
}

const multiplyByThreeAndAbsolute = compose(multiplyByThree, makePositive);
console.log(multiplyByThreeAndAbsolute(-50)); // 150

// Pipe: Instead of going from right to left as in Compose approach, it goes
// from left to right.

function pipe(f, g) {
  return function (data) {
    g(f(data));
  };
}
