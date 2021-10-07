// Callback Queue - Task Queue
setTimeout(() => console.log("1"), 0);
setTimeout(() => console.log("2"), 10);

// Job Queue - Microtask Queue
Promise.resolve("hi").then((data) => console.log("3", data));

console.log("4");

// Program output:
// 4
// 3 hi
// 1
// 2
