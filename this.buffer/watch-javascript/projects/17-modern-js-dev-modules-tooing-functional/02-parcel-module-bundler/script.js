// Importing module
console.log("Importing module");

import add, { cart } from "./shoppingCart.js";

add("pizza", 2);
add("bread", 5);
add("apples", 4);

console.log(cart);

import { cloneDeep } from "lodash";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 3 }
  ],
  user: {
    loggedIn: true
  }
};

const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log({ stateDeepClone });

// Enabling Hot Module Replacement (HMR) in Parcel. See: https://parceljs.org/features/development/#hot-reloading
if (module.hot) {
  module.hot.accept();
}

//-- Parcel transpiling demo

class Person {
  #greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person("jonas");
console.log(jonas);

console.log(cart.find((item) => item.quantity >= 2));
Promise.resolve("TEST").then((x) => console.log(x));

//-- Polyfilling: Two packages are used for polyfilling your code:
//     - "core-js" to polyfill ECMAScript features
//     - "regenerator-runtime/runtime" to use transpiled generator functions

// By default, Parcel uses Babel to "transpile" (convert) JavaScript syntax to
// a default widely accessible JavaScript syntax. However, there's another step
// that's required if you want to support older brwoser and that step is called
// "polyfilling". Babel can transpile language features like arrow functions
// without a problem because it has a direct counterpart, reguler functions.
// However, to convert features like array find() method, a polyfill library
// is needed. The polyfill library includes a re-created version of the polyfilled
// features (like find() method) and make it available in the bundle so that the
// code can use it. "core-js" is such a library which you can import to polyfill
// language features used in your modules.
import "core-js/stable";

// We can cherry-pick what to polyfill by importing only that specific
// implementation. This can take longer time to prepare, but if your bundle size
// is not an issue then you don't need to do it like this (normally it's rarely
// done like this)
// import "core-js/stable/array/find";
// import "core-js/stable/promise";

// Polyfilling async functions
import "regenerator-runtime/runtime";
