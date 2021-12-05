/*
//-- Simple array methods

let arr = ["a", "b", "c", "d", "e"];

// Slice

console.log(arr.slice(2)); // ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // ['c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(1, -1)); // ['b', 'c', 'd']
console.log(arr.slice()); // Shallow copy
console.log([...arr]); // Shallow copy

// Splice

// console.log(arr.splice(2)); // ['c', 'd', 'e']
// console.log(arr); // ['a', 'b'] Original array is mutated

// arr.splice(-1); // Remove & return the last element
// console.log(arr);

// arr.splice(1, 2);
// console.log(arr); // ['a', 'd', 'e']

// Reverse

const arr2 = ["j", "i", "h", "g", "f"];

console.log(arr2.reverse()); // Mutates original array
console.log(arr2);

// Concat

arr = ["a", "b", "c", "d", "e"];
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// Join

console.log(letters.join(" — "));
*/

/*
//-- The at() method (ES2022): Useful for accessing single array items relative
// to array end, or using with method chaining.

const arr = [23, 11, 64];

// Getting the last element

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

// Getting an arbitrary element

console.log(arr[0]);
console.log(arr.at(0));
console.log(arr.at(-2));

// Also works with strings

console.log("jonas".at(-1));
*/

/*
//-- Looping arrays: forEach: One notable difference from classical loops or
// for...of loop is that you cannot break; or continue; inside a forEach loop.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, mov] of movements.entries()) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
}

console.log("--------");

// forEach() params: Current array item, current item index, whole array.
movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
*/

/*
//-- forEach with Maps and Sets

// Map

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"]
]);

// forEach params on a Map correspond to the params of the array version.
currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// Set

const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);

// forEach params on Set: "value" and "key" hold the same value because a Set
// doesn't have keys or indexes, so there's no value that would make sense
// for the key parameter. That's why the value is passed to both of the
// first 2 parameters so that the method signature would be the same as it
// is on arrays and Maps.
currenciesUnique.forEach((value, key, set) => {
  console.log(`${key}: ${value}`);
});
*/

/*
//-- flat() and flatMap()

const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(arr.flat()); // Goes 1 level deep by default

const arrDeep = [
  [[1, 2], 3],
  [4, [5, 6]],
  [7, 8, 9]
];

console.log(arrDeep.flat(2)); // Can specify how deep to go

// Practical examples

const overallBalance = accounts
  .map((account) => account.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance);

// Since mappint & immediately flatting is a common operation, flatMap does
// that. It's better for performance. Note that flatMap only goes 1 level deep,
// if you need to go deeper than 1 level, you need to use flat() instead.
const overallBalance2 = accounts
  .flatMap((account) => account.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance2);
*/

/*
//-- sort() method: By default, sorts items by converting them to strings.

// Strings

const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort()); // Mutates original array

// Numbers

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.sort()); // Sorts them by converting each to string

// Ascending
// console.log(movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else if (a < b) {
//     return -1;
//   }
// }));
console.log(movements.sort((a, b) => a - b));

// Descending
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) {
//       return -1;
//     } else if (a < b) {
//       return 1;
//     }
//   })
// );
console.log(movements.sort((a, b) => b - a));
*/

/*
//-- More ways of creating and filling arrays

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays & fill() method

// Creates an array with 7 empty slots
const x = new Array(7);
console.log(x);

// This has no effect on empty slots!
// console.log(x.map(() => 5));

// Instead, we can call fill() to fill empty slots
// x.fill(5);
// console.log(x);

// Fill the array starting from index 3, so first 3 items are left empty
// x.fill(1, 3);
// console.log(x);

// Fill the array starting from index 3 to index 5
x.fill(1, 3, 5);
console.log(x);

// We can use fill() to replace existing array values as well
arr.fill(23, 4, 6);
console.log(arr);

// Array.from() method: Creates arrays from array-like structures (iterables).

// Create a 7-length array where all items are 1
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// Create a 7-length array where values go from 1 to 7
// const z = Array.from({ length: 7 }, (curr, idx) => idx + 1);
const z = Array.from({ length: 7 }, (_, idx) => idx + 1);
console.log(z);

// The second argument of Array.from is a mapper function which can transform
// the items of the iterable passed in the first argument!
labelBalance.addEventListener("click", () => {
  const movementsUi = Array.from(
    document.querySelectorAll(".movements__value"),
    (elem) => Number(elem.textContent.replace("€", ""))
  );

  // We can also convert iterables to arrays using spread operator
  // const movementsUi2 = [...document.querySelectorAll(".movements__value")];

  console.log(movementsUi);
});
*/

/*
//-- Array methods practice (creative usage of reduce() method and others)

// 1

const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, curr) => sum + curr, 0);

console.log(bankDepositSum);

// 2

// const numDeposits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// 3

const sums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, curr) => {
      // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
      sums[curr > 0 ? "deposits" : "withdrawals"] += curr;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums);

// 4

function convertToTitleCase(title) {
  function capitalize(text) {
    return text[0].toUpperCase() + text.slice(1);
  }

  const exceptions = [
    "a",
    "an",
    "and",
    "is",
    "the",
    "but",
    "or",
    "on",
    "in",
    "with"
  ];
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");

  return capitalize(titleCase);
}

console.log(convertToTitleCase("this is a nice title"));
console.log(convertToTitleCase("this is a LONG title but not too long"));
console.log(convertToTitleCase("and here is another title with an EXAMPLE"));
*/

/*
//-- Coding challenge

const dogs = [
  {
    weight: 22,
    currFood: 250,
    owners: ["Alice", "Bob"]
  },
  {
    weight: 8,
    currFood: 200,
    owners: ["Matilda"]
  },
  {
    weight: 13,
    currFood: 275,
    owners: ["Sarah", "John"]
  },
  {
    weight: 32,
    currFood: 340,
    owners: ["Michael"]
  }
];

function isDogEatingMuch(dog) {
  return dog.currFood > dog.recommendedFood * 1.1;
}

function isDogEatingLittle(dog) {
  return dog.currFood < dog.recommendedFood * 0.9;
}

function isDogEatingOkay(dog) {
  return (
    dog.currFood > dog.recommendedFood * 0.9 &&
    dog.currFood < dog.recommendedFood * 1.1
  );
}

// 1

dogs.forEach(
  (dog) => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2

const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));

if (isDogEatingLittle(dogSarah)) {
  console.log("Sarah's dog is eating too little!");
} else if (isDogEatingMuch(dogSarah)) {
  console.log("Sarah's dog is eating too much!");
}

// 3

const ownersEatTooMuch = dogs
  .filter((dog) => isDogEatingMuch(dog))
  .flatMap((dog) => dog.owners);

const ownersEatTooLittle = dogs
  .filter((dog) => isDogEatingLittle(dog))
  .flatMap((dog) => dog.owners);

// 4

console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!'`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!'`);

// 5

console.log(dogs.some((dog) => dog.currFood === dog.recommendedFood));

// 6

console.log(dogs.some(isDogEatingOkay));

// 7

console.log(dogs.filter(isDogEatingOkay));

// 8

console.log(
  dogs.slice().sort((d1, d2) => d1.recommendedFood - d2.recommendedFood)
);
*/
