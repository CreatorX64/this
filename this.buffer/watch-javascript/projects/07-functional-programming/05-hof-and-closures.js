// HOF (Higher Order Functions)

function hof(fn) {
  return fn(5);
}

// Closure

function closureNotPure() {
  let count = 0;
  return function increment() {
    count++;
    return count;
  };
}

function closurePure() {
  let count = 55;
  return function getCounter() {
    return count;
  };
}
