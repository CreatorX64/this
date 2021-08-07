let myBook =
{
  title: "1984",
  author: "George Orwell",
  pageCount: 326
};

console.log(`${myBook.title} by ${myBook.author}`);

myBook.title = "Animal Farm";

console.log(`${myBook.title} by ${myBook.author}`);

// Challenge

let me =
{
  name: "Hakan",
  age: 26,
  location: "Istanbul"
};

console.log(`${me.name} is ${me.age} and lives in ${me.location}.`);

me.age += 1;

console.log(`${me.name} is ${me.age} and lives in ${me.location}.`);