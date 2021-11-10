//-- Using a library with a type declaration package.

// import _ from "lodash";
// console.log(_.shuffle([1, 2, 3]));

//-- Using a "declare" as a **last resort**.

// This is a variable declared on the global window object (check index.html).
// declare var globalVar: any;
// console.log(globalVar);

//-- Using libraries that include their type declarations.

import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Product } from "./Product";

// const p1 = new Product("Book", 12.99);
// console.log(p1.getInformation());

const products = [
  { title: "Carpet", price: 29.99 },
  { title: "Book", price: 10.99 }
];

// const loadedProducts = products.map(
//   (product) => new Product(product.title, product.price)
// );
const loadedProducts = plainToClass(Product, products);

for (const product of loadedProducts) {
  console.log(product.getInformation());
}

const newProduct = new Product("", -5.99);
validate(newProduct).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS!");
    console.log(errors);
  } else {
    console.log(newProduct.getInformation());
  }
});
