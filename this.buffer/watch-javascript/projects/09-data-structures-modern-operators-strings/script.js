"use strict";

const days = ["thu", "fri", "sat"];

const openingHours = {
  [days[0]]: {
    open: 12,
    close: 22
  },
  [days[1]]: {
    open: 11,
    close: 23
  },
  [days[2]]: {
    open: 0, // Open 24 hours
    close: 24
  }
};
// console.log(openingHours);

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Itely",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours, // Enhanced object literal
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here's your pasta with ${ing1}, ${ing2}, ${ing3}`);
  }
};

/*
//-- Destructuring arrays

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring

const nested = [2, 4, [5, 6]];

// const [i, , j] = nested;
// console.log(i, j);

const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values

const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/

/*
//-- Destructuring objects

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Rename
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open: o, close: c }
} = openingHours;
console.log(o, c);

restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2
});
restaurant.orderDelivery({ address: "Via del Sole, 21", starterIndex: 1 });
*/

/*
//-- Spread operator (...)

const arr = [7, 8, 9];
const newArr = [1, 2, ...arr];

console.log(newArr);
console.log(...newArr); // Pass as multiple arguments!

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// Iterables: arrays, strings, maps, sets. NOT objects!
const str = "Jonas";
const letters = [...str, " ", "S."];
console.log(letters);

const ingredients = ["eggs", "ketchup", "milk"];
restaurant.orderPasta(...ingredients);

// Objects
const newRastaurant = { foundIn: 1998, ...restaurant, founder: "Guiseppe" };
console.log(newRastaurant);

// Shallow copy object
const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

/*
//-- Rest pattern and parameters

// Destructuring

const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// Functions

const add = (...numbers) => {
  const sum = numbers.reduce((a, b) => a + b);
  console.log(sum);
};

add(2, 3);
add(5, 7, 3, 2);

const x = [23, 5, 7];
add(...x);
*/

/*
//-- Short circuiting (&& and ||)

// OR (||) operator

console.log(3 || "Jonas"); // 3
console.log("" || "Jonas"); // "Jonas"
console.log(true || 0); // true
console.log(undefined || null); // null

console.log(undefined || 0 || "" || "Hello" || 23 || null); // "Hello"

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// AND (&&) operator

console.log(0 && "Jonas"); // 0
console.log(7 && "Jonas"); // "Jonas"

console.log("Hello" && 23 && null && "Jonas"); // null

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");
*/

/*
//-- The nullish coalescing operator (??)

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); // We expected 0 but we got 10!

// Nullish (just like truthy of falsy): null and undefined
const guestsCorrect = restaurant.numGuests ?? 10; // Checks nullish value
console.log(guestsCorrect); // 0
*/

/*
//-- Logical assignment operators (ES2021)

const rest1 = {
  name: "Capri",
  // numGuests: 20

  // This will cause the ||= operator to work unexpected! Use ??= instead.
  numGuests: 0
};
const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi"
};

// OR assignment operator
// rest1.numGuests ||= 10; // rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests ||= 10; // rest2.numGuests = rest2.numGuests || 10;

// Nullish coalescing assignment operator
rest1.numGuests ??= 10; // rest1.numGuests = rest1.numGuests ?? 10;
rest2.numGuests ??= 10; // rest2.numGuests = rest1.numGuests ?? 10;

// AND assignment operator
rest1.owner &&= "anonymous"; // rest1.owner = rest1.owner && "anonymous";
rest2.owner &&= "anonymous"; // rest2.owner = rest2.owner && "anonymous";

console.log(rest1);
console.log(rest2);
/*

/*
//-- Looping arrays: The for-of loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const [index, item] of menu.entries()) {
  console.log(index, item);
}
*/

/*
//-- Optional chaining operator (.?)

// If the expression before the "?" is undefined or null, the whole thing
// evaluates to undefined. If not, the chain continues.
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

const days2 = ["mon", "tue", "wen", "thu", "fri", "sat"];
for (const day of days2) {
  console.log(restaurant.openingHours[day]?.open ?? "closed");
}

// Methods

console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

// Arrays

const users = [{ name: "Jonas", email: "hello@jonas.com" }];
console.log(users[0]?.name ?? "User array empty");
*/

/*
//-- Looping objects: Object keys, values, entries

// Property keys

const propKeys = Object.keys(openingHours);
console.log(propKeys);

let openStr = `We are open on ${propKeys.length} days: `;
for (const day of propKeys) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property values

const propValues = Object.values(openingHours);
console.log(propValues);

// Entire object entries

const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(key, open, close);
}
*/

/*
//-- Sets

const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza"
]);
console.log(ordersSet);

console.log(new Set());
console.log(new Set("Jonas"));

console.log(ordersSet.size);
console.log(ordersSet.has("Pizza"));
console.log(ordersSet.has("Bread"));
ordersSet.add("Garlic bread");
ordersSet.add("Garlic bread");
ordersSet.delete("Risotto");
console.log(ordersSet);
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example use case

const staff = ["Waiter", "Chef", "Waiter", "Chef", "Manager", "Chef"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size);

console.log(new Set("jonasschemdtmann").size);
*/

/*
//-- Maps: Fundamentals. The main difference between a Map and a regular object
// is that Maps can have ANY value as a key, whereas objects can only have numbers
// and strings.

const rest = new Map();
rest.set("name", "Classico Italiano");
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Lisbon, Portugal"));

rest
  .set("categories", ["a", "b", "c"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open")
  .set(false, "Closed");

console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has("categories"));
rest.delete(2);
console.log(rest);
console.log(rest.size);
// rest.clear();
// console.log(rest);

const arrKey = [1, 2];
rest.set(arrKey, "Array key's value!!!");
console.log(rest);
console.log(rest.get(arrKey));

rest.set(document.querySelector("h1"), "Heading");
*/

/*
//-- Maps: Iteration

// We pass the same structure that we receive from "Object.entires"
const question = new Map([
  ["question", "What is the best programming lang?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct"],
  [false, "Try again!"]
]);
console.log(question);

// Convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get("question"));
for (const [key, val] of question) {
  if (typeof key === "number") console.log(key, val);
}
// const answer = Number(prompt("Your answer"));
// console.log(question.get(question.get("correct") === answer));

// Convert Map to array
console.log([...question]);
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);
*/

/*
//-- Challenge

const gameEvents = new Map([
  [17, "GOAL"],
  [36, "Sub"],
  [47, "GOAL"],
  [61, "Sub"],
  [64, "Yellow card"],
  [69, "Red card"],
  [70, "Sub"],
  [72, "Sub"],
  [76, "GOAL"],
  [80, "GOAL"],
  [92, "Yellow card"]
]);

// 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2
gameEvents.delete(64);
console.log(gameEvents);

// 3
// const time = Math.max(...gameEvents.keys());
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

// 4
for (const [min, event] of gameEvents.entries()) {
  const half = min <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half} HALF] ${min}: ${event}`);
}
*/

/*
//-- Working with strings pt 1

const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B737"[0]);

console.log(airline.length);
console.log("B737".length);

console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("portugal"));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(0, airline.lastIndexOf(" ")));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = (seat) => {
  const s = seat.slice(-1);
  if (s === "B" || s === "E") {
    console.log("You got the middle seat");
  } else {
    console.log("You got lucky!");
  }
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

console.log("jonas".toLowerCase()); // Auto-boxing happens here!
console.log(new String("jonas").toLowerCase()); // This happens behind the scenes.
*/

/*
//-- Working with strings pt 2

const airline = "TAP Air Portugal";

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

const passenger = "jOnAS";
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails

const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.Io \n";
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// Replacing

const priceEU = "288,97€";
const priceUS = priceEU.replace("€", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";

// Only replaces first occurance.
console.log(announcement.replace("door", "gate"));
// Replaces all occurances.
console.log(announcement.replace(/door/g, "gate"));
console.log(announcement.replaceAll("door", "gate")); // ES2021

// Booleans

const plane = "A320neo";
console.log(plane.includes("A320"));
console.log(plane.includes("Boeing"));
console.log(plane.startsWith("Airb"));

if (plane.startsWith("Airbus") && plane.endsWith("neo")) {
  console.log("Part of the enw airbus family");
}

const checkBaggage = (items) => {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("not allowed");
  } else {
    console.log("welcome");
  }
};
checkBaggage("I have a laptop, some food, and a knife");
checkBaggage("Socks and camera");
*/

/*
//-- Working with strings pt 3

console.log("a+very+nice+string".split("+"));
console.log("Jonas Schmedtmann".split(" "));

const [firstName, lastName] = "Jonas Schmedtmann".split(" ");

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

const capitalizedName = (name) => {
  const names = name.toLowerCase().split(" ");
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }

  console.log(namesUpper.join(" "));
};
capitalizedName("jessica ann smith davis");
capitalizedName("joNas schmeDTmann");

// Padding

const message = "Go to gate 23!";
console.log(message.padStart(20, "+").padEnd(30, "+"));
console.log("Jonas".padStart(20, "+").padEnd(30, "+"));

const maskCreditCard = (number) => {
  const str = String(number);
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

console.log(maskCreditCard(345345345));
console.log(maskCreditCard(384957894375843975));
console.log(maskCreditCard("2394857349857943857"));

// Repeat

const message2 = "Bad weather... All departures delayed... ";
console.log(message2.repeat(5));

const planesInLine = (numOfPlanes) => {
  console.log(
    `There are ${numOfPlanes} planes in line ${"✈".repeat(numOfPlanes)}`
  );
};

planesInLine(5);
planesInLine(3);
planesInLine(12);
*/

/*
//-- Challenge

document.body.appendChild(document.createElement("textarea"));
document.body.appendChild(document.createElement("button"));

document.querySelector("button").addEventListener("click", () => {
  const text = document.querySelector("textarea").value;
  const lines = text.split("\n");

  for (const [index, line] of lines.entries()) {
    const [first, second] = line.trim().toLowerCase().split("_");
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    console.log(`${output.padEnd(20)}${"✅".repeat(index + 1)}`);
  }
});
*/

/*
//-- Challenge #2

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split("+")) {
  const [type, from, to, time] = flight.split(";");

  const output = `${type.startsWith("_Delayed") ? "🛑 " : ""}${type
    .slice(1)
    .replaceAll("_", " ")} from ${getCode(from)} to ${getCode(
    to
  )} (${time.replace(":", "h")})`.padStart(50);

  console.log(output);
}
*/
