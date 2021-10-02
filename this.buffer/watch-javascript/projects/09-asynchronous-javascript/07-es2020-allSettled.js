const promiseOne = new Promise((resolve, reject) => setTimeout(resolve, 10000));
const promiseTwo = new Promise((resolve, reject) => setTimeout(reject, 1000));

// Promise.all() has to have all promises resolve. It discards promises that
// are resolved if there is even a single promise that rejected.
// Promise.all([promiseOne, promiseTwo])
//   .then((data) => console.log(data))
//   .catch((err) => console.log("Something failed:", err));

// Promise.allSettled() doesn't care about a rejected promise. It runs all
// promises whether they reject or not. It will return once all promises are
// resolved OR rejected.
Promise.allSettled([promiseOne, promiseTwo])
  .then((data) => console.log(data))
  .catch((err) => console.log("Something failed:", err));
