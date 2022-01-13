/*
//-- Understanding JavaScript types and type coercion

let hatPrice = 100;
console.log(`Hat price: ${hatPrice}`);
let bootsPrice = "100";
console.log(`Boots price: ${bootsPrice}`);

let taxRate;
// console.log(`Tax rate: ${taxRate || 10}%`);
console.log(`Tax rate: ${taxRate ?? 10}%`);
taxRate = 0;
// console.log(`Tax rate: ${taxRate || 10}%`);
console.log(`Tax rate: ${taxRate ?? 10}%`);

// if (hatPrice == bootsPrice) {
if (hatPrice === bootsPrice) {
  console.log("Prices are the same");
} else {
  console.log("Prices are different");
}

// let totalPrice = hatPrice + bootsPrice;
let totalPrice = Number(hatPrice) + Number(bootsPrice);
console.log(`Total price: ${totalPrice}`);

let myVariable = "Adam";
console.log(`Type: ${typeof myVariable}`);
myVariable = 100;
console.log(`Type: ${typeof myVariable}`);

let firstCity;
let secondCity = firstCity || "London";
console.log(`City: ${secondCity}`);
*/

/*
//-- Working with functions

let hatPrice = 100;
console.log(`Hat price: ${hatPrice}`);
let bootsPrice = "100";
console.log(`Boots price: ${bootsPrice}`);

// function sumPrices(first, second, third) {
// function sumPrices(first, second, third = 0) {
function sumPrices(...numbers) {
  // return numbers.reduce((sum, curr) => sum + curr, 0);

  return numbers.reduce((sum, curr) => {
    return sum + (Number.isNaN(Number(curr)) ? 0 : Number(curr));
  }, 0);
}

let totalPrice = sumPrices(hatPrice, bootsPrice);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`);

totalPrice = sumPrices(100, 200, 300);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`);

totalPrice = sumPrices(100, 200, undefined, false, "hello");
console.log(`Total: ${totalPrice} ${typeof totalPrice}`);
*/

/*
//-- Working with arrays

let names = ["Hat", "Boots", "Gloves"];
let prices = [];

prices.push(100);
prices.push("100");
prices.push(50.25);

console.log(`First item: ${names[0]}: ${prices[0]}`);

function sumPrices(...numbers) {
  return numbers.reduce((sum, curr) => {
    return sum + (Number.isNaN(Number(curr)) ? 0 : Number(curr));
  }, 0);
}

let totalPrice = sumPrices(...prices);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`);

let combinedArray = [...names, ...prices];
combinedArray.forEach((element) =>
  console.log(`Combined array element: ${element}`)
);

let [one, two] = names;
console.log(`One: ${one}, Two: ${two}`);
let [, , three] = names;
console.log(`Three: ${three}`);

prices = [100, 120, 50.25];
let [, ...highest] = prices.sort((a, b) => a - b);
highest.forEach((price) => console.log(`High price: ${price}`));
*/

/*
//-- Working with objects

let hat = {
  name: "Hat",
  _price: 100,
  priceIncTax: 100 * 1.2,

  set price(newPrice) {
    this._price = newPrice;
    this.priceIncTax = this._price * 1.2;
  },

  get price() {
    return this._price;
  },

  // writeDetails: function () {
  writeDetails() {
    console.log(`${this.name}: ${this.price}, ${this.priceIncTax}`);
  }
};

let boots = {
  name: "Boots",
  price: "100",

  get priceIncTax() {
    return Number(this.price) * 1.2;
  }
};

let gloves = {
  productName: "Gloves",
  price: "40"
};

function sumPrices(...numbers) {
  return numbers.reduce((sum, curr) => {
    return sum + (Number.isNaN(Number(curr)) ? 0 : Number(curr));
  }, 0);
}

gloves.name = gloves.productName;
delete gloves.productName;
gloves.price = 20;

let totalPrice = sumPrices(hat.price, boots.price, gloves.price);
console.log(`Total: ${totalPrice} ${typeof totalPrice}`);

let propertyCheck = hat.price ?? 0;
// let objectAndPropertyCheck = (hat ?? {}).price ?? 0;
let objectAndPropertyCheck = hat?.price ?? 0;
console.log(`Checks: ${propertyCheck}, ${objectAndPropertyCheck}`);

let otherHat = { ...hat };
console.log(`Spread: ${otherHat.name}, ${otherHat.price}`);

let additionalProperties = { ...hat, discounted: true };
console.log(`Additional: ${JSON.stringify(additionalProperties)}`);

let replacedProperties = { ...hat, price: 10 };
console.log(`Replaced: ${JSON.stringify(replacedProperties)}`);

let { price, ...someProperties } = hat;
console.log(`Selected: ${JSON.stringify(someProperties)}`);

console.log(`Hat: ${hat.price}, ${hat.priceIncTax}`);
hat.price = 120;
console.log(`Hat: ${hat.price}, ${hat.priceIncTax}`);

console.log(`Boots: ${boots.price}, ${boots.priceIncTax}`);
boots.price = "120";
console.log(`Boots: ${boots.price}, ${boots.priceIncTax}`);

hat.price = 100;
hat.writeDetails();
hat.price = 120;
hat.writeDetails();
*/

//-- Understanding the "this" keyword

let hat = {
  name: "Hat",
  _price: 100,
  priceIncTax: 100 * 1.2,

  set price(newPrice) {
    this._price = newPrice;
    this.priceIncTax = this._price * 1.2;
  },

  get price() {
    return this._price;
  },

  // writeDetails: () => {
  writeDetails() {
    console.log(`${this.name}: ${this.price}, ${this.priceIncTax}`);
  }
};

let boots = {
  name: "Boots",
  price: "100",

  get priceIncTax() {
    return Number(this.price) * 1.2;
  }
};

hat.writeDetails = hat.writeDetails.bind(hat);
// hat.writeDetails();
// hat.price = 120;
// hat.writeDetails();

// console.log(`Boots: ${boots.price}, ${boots.priceIncTax}`);
// boots.price = "120";
// console.log(`Boots: ${boots.price}, ${boots.priceIncTax}`);

// "this" in stand-alone functions

// function writeMessage(message) {
//   console.log(`${this.greeting}, ${message}`);
// }

// Variables defined without let, const, or var keywords are attached to the
// global object in Node (and the window object in the browser).
// greeting = "Hello";

// Both of the calls below print: "Hello, It is sunny today"
// writeMessage("It is sunny today");
// // This is what happens behind the scenes:
// writeMessage.call(global, "It is sunny today");

// "this" in methods

// let myObject = {
//   greeting: "Hi there",

//   writeMessage(message) {
//     console.log(`${this.greeting}, ${message}`);
//   }
// };

// greeting = "Hello";

// Both of the calls below print: "Hi there, It is sunny today"
// myObject.writeMessage("It is sunny today");
// myObject.writeMessage.call(myObject, "It is sunny today");

// However, this will print: "Hello, It is sunny today"
// let myFunction = myObject.writeMessage;
// myFunction("It is sunny today");

// Changing behavior of the "this" keyword.

// This time, below will print: "Hi there, It is sunny today"
// myObject.writeMessage = myObject.writeMessage.bind(myObject);
// myFunction = myObject.writeMessage;
// myFunction("It is sunny today");

// Understanding "this" in arrow functions

let myObject = {
  greeting: "Hi there",

  getWriter() {
    return (message) => console.log(`${this.greeting}, ${message}`);
  }
};

greeting = "Hello";

// Prints: "Hi there, It is raining today"
let writer = myObject.getWriter();
writer("It is raining today");

// Prints: "Hi there, It is raining today"
myObject.getWriter()("It is raining today");

// Prints: "Hello, It is raining today"
let standAlone = myObject.getWriter;
let standAloneWriter = standAlone();
standAloneWriter("It is sunny today");
