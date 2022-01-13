import calcTax from "./tax.js";

export function printDetails(product) {
  let taxedPrice = calcTax(product.price);
  console.log(`Name: ${product.name}, Taxed price: ${taxedPrice}`);
}

export function applyDiscount(product, discount = 5) {
  product.price = product.price - discount;
}
