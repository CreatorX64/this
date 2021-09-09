// Object destructuring

// const person = {
//   name: "Andrew",
//   age: 26,
//   location: {
//     city: "Philadelphia",
//     temp: 88
//   }
// };

// // const { name = "Anonymous", age } = person;
// const { name: firstName = "Anonymous", age } = person;
// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location;
// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}.`);
// }

// Object destructuring challenge

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
//   publisher: {
//     name: "Penguin"
//   }
// };

// const { name: publisherName = "Self-Published" } = book.publisher;

// console.log(publisherName);

// Array destructuring

// const address = [
//   "1299 S Juniper Street",
//   "Philadelphia",
//   "Pennsylvania",
//   "19147"
// ];
// const address2 = [];

// const [street, city, state, zip] = address;
// const [street, city, state] = address;
// const [, city, state = "New York"] = address;
// const [, , state = "New York"] = address2;

// console.log(`You are in ${city} ${state}.`);

// Array destructuring challenge

const item = ["Coffee (iced)", "$3.00", "$3.50", "$3.75"];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);
