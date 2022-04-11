// Importing module
console.log("Importing module");

/*
//-- Named imports

import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";

addToCart("bread", 5);
console.log(price, tq);
*/

/*
//-- Namespace imports

import * as ShoppingCart from "./shoppingCart.js";

ShoppingCart.addToCart("bread", 5);
console.log(ShoppingCart.totalPrice);
*/

/*
//-- Default imports

import add, { cart } from "./shoppingCart.js";

// The designers of the JS specification intentionally made default imports &
// defaults exports easier by not requiring curly breaces. That's why you
// should strive to export one default thing from a module and import one
// default thing from a module, try not to mix and match named imports with
// default imports like below. It's possible to do, but it's best practice
// to try to avoid that.
// import add, { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// console.log(price);

add("pizza", 2);
add("bread", 5);
add("apples", 4);

console.log(cart);
*/

/*
//-- Top-level await (ES2022): Works only inside modules. However, keep in mind
// that top-level awaits block execution of the entire module! Also, if one
// module imports another module which has a top-level await, then the importing
// module will wait for the imported module to finish the blocking code.

// Top-level await blocking demonstration
// console.log("Start fetching...");
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);
// console.log("This will only be printed after fetch operation");

// Real-world example of top-level await
// const getLastPost = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const data = await res.json();
//   console.log(data);
//   return {
//     title: data.at(-1).title,
//     text: data.at(-1).body
//   };
// };
// const lastPost = await getLastPost();
// console.log(lastPost);

// Another top-level await blocking demonstration: With a module that includes
// top-level await.
import { addToCart } from "./shoppingCart.js";
addToCart("bread", 5);
*/

/*
//-- The Module Pattern: This was used before in order to implement modules in
// JavaScript. Even if you won't use it yourself, you'll still see this pattern
// in the wild. Fundamentally, this takes advantage of closures. This type of
// module system had its problems which are not present in ES6 modules: Have to
// be careful with the order of script tags in HTML, all the variables (module
// namespaces) still live in global scope which could clash, and we can't bundle
// them using a module bundler. Native modules in ES6 were added to counteract
// these limitations.

const ShoppingCart = (() => {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = (product, quantity) => {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity
  };
})();

ShoppingCart.addToCart("apple", 4);
ShoppingCart.addToCart("pizza", 2);
console.log(ShoppingCart);
// console.log(ShoppingCart.shippingCost); // Not available outside module
*/

/*
//-- Besides native ES modules and the module pattern, there are also other
// modules systems that have beens used by JavaScript in the past (but again,
// they were not native JavaScript and relied on some external implementations).
// Two examples are: AMD modules, CommonJS modules. Here we'll look at CommonJS
// because it has been used in Node.js for all its existence. Only recently ES
// moduels have been implemented in Node.js. One consequence of this is that all
// modules in NPM repository still use the CommonJS module system. The reason
// for that is that NPM was originally only intended for Node which uses CommonJS.
// Only later NPM became the standard repository for the whole JS world.
// Therefore, you'll still see a lot of CommonJS in the wild. Just like in
// native ES, in CommonJS one file is one module. The below example won't work
// in the browser, it's just for demo purposes.

// Export (in a CommonJS module)
exports.addToCart = (product, quantity) => {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
  );
};

// Import (in another file that depends on the CommonJS module)
const { addToCart } = require("./shoppingCart.js");
*/

/*
//-- Using a third-part NPM module (ES module)

import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 3 }
  ],
  user: {
    loggedIn: true
  }
};

// Shallow cloning using Object.assign()
// const stateShallowClone = Object.assign({}, state);
// state.user.loggedIn = false;
// console.log({ stateShallowClone });

// Deep cloning using Lodash
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log({ stateDeepClone });
*/
