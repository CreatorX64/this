const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve("Stuff worked!");
  } else {
    reject("Error, it broke.");
  }
});

promise.then((result) => console.log(result));

promise
  .then((result) => result + "!")
  .then((result) => {
    throw Error;
    console.log(result);
  })
  .catch((err) => console.log(err));

promise
  .then((result) => result + "!")
  .then((result) => result + "?")
  .catch((err) => console.log(err)) // Only cathes above errors
  .then((result) => console.log(result));

//----

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "HI");
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "POOKIE");
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "NONONO");
});

Promise.all([promise, promise1, promise2, promise3]).then((values) =>
  console.log(values)
);

//----

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums"
];

Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
  .then((results) => {
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  })
  .catch((err) => console.log("Error:", err));
