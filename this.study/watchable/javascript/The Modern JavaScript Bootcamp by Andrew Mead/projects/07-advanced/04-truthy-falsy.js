const products = [{ name: "Computer mouse" }];
const product = products[0];

// Truthy: Values that resolve to true in boolean context.
//     all values except falsy values

// Falsy: Values that resolve to false in boolean context.
//     false, 0, empty string, null, undefined, NaN

if (product)
{
  console.log("Product found");
}
else
{
  console.log("Product not found");
}