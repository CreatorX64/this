/*
//-- Understanding JavaScript object inheritance

let hat = {
  name: "Hat",
  price: 100,
  getPriceIncTax() {
    return Number(this.price) * 1.2;
  }
};

let boots = {
  name: "Boots",
  price: 100,
  getPriceIncTax() {
    return Number(this.price) * 1.2;
  }
};

console.log(`Hat: ${hat.price}, ${hat.getPriceIncTax()}`);
console.log(`toString: ${hat.toString()}`);

let hatPrototype = Object.getPrototypeOf(hat);
console.log(`Hat prototype: ${hatPrototype}`);

let bootsPrototype = Object.getPrototypeOf(boots);
console.log(`Boots prototype: ${bootsPrototype}`);

console.log(`Common prototype: ${hatPrototype === bootsPrototype}`);

// Here we update the toString method on Object.prototype, but that's not a good idea.
hatPrototype.toString = function () {
  return `toString: Name: ${this.name}, Price: ${this.price}`;
};

// Creating custom prototypes

let ProductProto = {
  toString: function () {
    return `toString: Name: ${this.name}, Price: ${this.price}`;
  }
};

Object.setPrototypeOf(hat, ProductProto);
Object.setPrototypeOf(boots, ProductProto);
*/

/*
//-- Using constructor functions

function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.toString = function () {
  return `toString: Name: ${this.name}, Price: ${this.price}`;
};

// Defining static properties and methods
Product.process = function (...products) {
  products.forEach((product) => console.log(product.toString()));
};

function TaxedProduct(name, price, taxRate) {
  Product.call(this, name, price);
  this.taxRate = taxRate;
}

Object.setPrototypeOf(TaxedProduct.prototype, Product.prototype);

TaxedProduct.prototype.getPriceIncTax = function () {
  return Number(this.price) * this.taxRate;
};

TaxedProduct.prototype.toTaxString = function () {
  return `${this.toString()}, Tax: ${this.getPriceIncTax()}`;
};

let hat = new TaxedProduct("Hat", 100, 1.2);
let boots = new Product("Boots", 100);

console.log(hat.toTaxString());
console.log(boots.toString());

// Checking prototype types

console.log(`hat and TaxedProduct: ${hat instanceof TaxedProduct}`);
console.log(`hat and Product: ${hat instanceof Product}`);
console.log(`boots and TaxedProduct: ${boots instanceof TaxedProduct}`);
console.log(`boots and Product: ${boots instanceof Product}`);
// If you're not using constructors to establish prototypal inheritance, you
// cannot use instanceof. Instead, you can use Object.isPrototypeOf

Product.process(new Product("Hat", 100, 1.2), new Product("Boots", 100));
*/

/*
//-- Using JavaScript classes

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  toString() {
    return `toString: Name: ${this.name}, Price: ${this.price}`;
  }
}

class TaxedProduct extends Product {
  constructor(name, price, taxRate) {
    super(name, price);
    this.taxRate = taxRate;
  }

  getPriceIncTax() {
    return Number(this.price) * this.taxRate;
  }

  toString() {
    let chainResult = super.toString();
    return `${chainResult}, Tax: ${this.getPriceIncTax()}`;
  }

  static process(...products) {
    products.forEach((product) => console.log(product.toString()));
  }
}

TaxedProduct.process(new Product("Hat", 100, 1.2), new Product("Boots", 100));

let hat = new TaxedProduct("Hat", 100);
let boots = new TaxedProduct("Boots", 100, 1.3);

console.log(hat.toString());
console.log(boots.toString());
*/

/*
//-- Using iterators and generators

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  toString() {
    return `toString: Name: ${this.name}, Price: ${this.price}`;
  }
}

// Iterator example: A function that returns an iterator
// function createProductIterator() {
//   const hat = new Product("Hat", 100);
//   const boots = new Product("Boots", 100);
//   const umbrella = new Product("Umbrella", 23);

//   let lastVal;

//   return {
//     next() {
//       switch (lastVal) {
//         case undefined:
//           lastVal = hat;
//           return { value: hat, done: false };
//         case hat:
//           lastVal = boots;
//           return { value: boots, done: false };
//         case boots:
//           lastVal = umbrella;
//           return { value: umbrella, done: false };
//         case umbrella:
//           return { value: undefined, done: true };
//       }
//     }
//   };
// }

// Generator example: It still returns an iterator, but manages all the
// iterator logic for us.
function* createProductIterator() {
  yield new Product("Hat", 100);
  yield new Product("Boots", 100);
  yield new Product("Umbrella", 23);
}

// let iterator = createProductIterator();
// let result = iterator.next();
// while (!result.done) {
//   console.log(result.value.toString());
//   result = iterator.next();
// }

// Generators can be used with the spread operator
[...createProductIterator()].forEach((p) => console.log(p.toString()));

// Defining iterable objects

class GiftPack {
  constructor(name, prod1, prod2, prod3) {
    this.name = name;
    this.prod1 = prod1;
    this.prod2 = prod2;
    this.prod3 = prod3;
  }

  getTotalPrice() {
    return [this.prod1, this.prod2, this.prod3].reduce(
      (total, p) => total + p.price,
      0
    );
  }

  // *getGenerator() {
  //   yield this.prod1;
  //   yield this.prod2;
  //   yield this.prod3;
  // }

  // A more elegant approach is to use the special method name for the
  // generator, which tells the JavaScript runtime that the method
  // provides the default iteration support for an object. The Symbol.iterator
  // property is used to denote the default iterator for an object.
  *[Symbol.iterator]() {
    yield this.prod1;
    yield this.prod2;
    yield this.prod3;
  }
}

let winterPack = new GiftPack(
  "winter",
  new Product("Hat", 100),
  new Product("Boots", 80),
  new Product("Gloves", 23)
);

console.log(`Total price: ${winterPack.getTotalPrice()}`);

// [...winterPack.getGenerator()].forEach((p) => console.log(`Product: ${p}`));
[...winterPack].forEach((p) => console.log(`Product: ${p}`));
*/

/*
//-- Using JavaScript collections

class Product {
  constructor(name, price) {
    // The benefit of using Symbol values as keys is that there is no
    // possibility of two keys colliding.
    this.id = Symbol();
    this.name = name;
    this.price = price;
  }

  toString() {
    return `toString: Name: ${this.name}, Price: ${this.price}`;
  }
}

class Supplier {
  constructor(name, productIds) {
    this.name = name;
    this.productIds = productIds;
  }
}

// Storing data by key using an Object

// let data = { hat: new Product("Hat", 100) };
// data.boots = new Product("Boots", 100);
// Object.keys(data).forEach((key) => console.log(data[key].toString()));

// Storing data by key using a Map

// let data = new Map();
// data.set("hat", new Product("Hat", 100));
// data.set("boots", new Product("Boots", 100));
// [...data.keys()].forEach((key) => console.log(data.get(key).toString()));

// Using Symbol values as keys

// let acmeProducts = [new Product("Hat", 100), new Product("Boots", 100)];
// let zoomProducts = [new Product("Hat", 100), new Product("Boots", 100)];

// let products = new Map();
// [...acmeProducts, ...zoomProducts].forEach((p) => products.set(p.id, p));

// let suppliers = new Map();
// suppliers.set(
//   "acme",
//   new Supplier(
//     "Acme Co",
//     acmeProducts.map((p) => p.id)
//   )
// );
// suppliers.set(
//   "zoom",
//   new Supplier(
//     "Zoom Shoes",
//     zoomProducts.map((p) => p.id)
//   )
// );

// suppliers
//   .get("acme")
//   .productIds.forEach((id) => console.log(`Name: ${products.get(id).name}`));

// Storing data by index

let product = new Product("Hat", 100);

let productArray = [];
let productSet = new Set();

for (let i = 0; i < 5; i++) {
  productArray.push(product);
  productSet.add(product);
}

console.log(`Array length: ${productArray.length}`);
console.log(`Set length: ${productSet.size}`);
*/

//-- Using modules

import calcTax, { calcTaxandSum } from "./tax.js";
import { printDetails, applyDiscount } from "./utils.js";

class Product {
  constructor(name, price) {
    this.id = Symbol();
    this.name = name;
    this.price = price;
  }
}

let product = new Product("Hat", 100);
applyDiscount(product, 10);
let taxedPrice = calcTax(product.price);
printDetails(product);
console.log(`Name: ${product.name}, Taxed price: ${taxedPrice}`);

let products = [new Product("Gloves", 23), new Product("Boots", 100)];
let totalPrice = calcTaxandSum(...products.map((p) => p.price));
console.log(`Total price: ${totalPrice.toFixed(2)}`);
