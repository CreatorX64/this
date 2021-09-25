function addTo80(n) {
  console.log("Long running task...");
  return n + 80;
}

// Memoization is a specific form of caching that involves caching the return
// value of a function based on its parameters. If the parameter(s) of a
// function doesn't change in consecutive calls, then the function is memoized
// (i.e. the function uses the cached value as a return value).

function memoizedAddTo80() {
  let cache = {};
  return function (n) {
    if (n in cache) {
      return cache[n];
    } else {
      console.log("Long running task...");
      cache[n] = n + 80;
      return cache[n];
    }
  };
}

const memoized = memoizedAddTo80();
memoized(5);
memoized(6);
memoized(6); // Memozied!
