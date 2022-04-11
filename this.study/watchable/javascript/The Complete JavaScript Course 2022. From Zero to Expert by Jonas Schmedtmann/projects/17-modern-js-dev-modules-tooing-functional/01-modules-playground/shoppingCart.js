// Exporting module
console.log("Exporting module");

// Blocking code: The top-level await here blocks execution in importing module.
// console.log("Start fetching users");
// await fetch("https://jsonplaceholder.typicode.com/users");
// console.log("Finished fetching users");

const shippingCost = 10;
export const cart = [];

//-- Named exports

export const addToCart = (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

//-- Default exports

export default (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
