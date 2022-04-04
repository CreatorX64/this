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
