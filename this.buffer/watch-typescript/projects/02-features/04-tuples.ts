// This object models a drink.
const drink = {
  color: "brown",
  carbonated: true,
  sugar: 40
};

// This array also models a drink, but with less information. However, arrays
// are not best suited collection types to model a single entity, because array
// elements' order might change which would break our model.
// const pepsi = ["brown", true, 40];
// pepsi[0] = 40;
// pepsi[2] = "brown";

// A better collection type we can use to model an entity is a "tuple".
// const pepsi: [string, boolean, number] = ["brown", true, 40];
// pepsi[0] = 40;  // Error!
// pepsi[2] = "brown";  // Error!

// The tuple type annotation above is very long and it is not practical to write
// it every time we want to create a variable of that type. We can reduce the amount
// of code we need to type by making use of a "type alias".

type Drink = [string, boolean, number];  // Type alias

const pepsi: Drink = ["brown", true, 40];
const sprite: Drink = ["clear", true, 40];
const tea: Drink = ["red", false, 0];

// You won't use tuples that often though, and here's why.

// At a glance, it is not easy to understand what the values are standing for.
const carSpecs: [number, number] = [400, 3354];

// Using an object to achieve the same thing is much more clearer to us and to others.
const carStats = {
  horsePower: 400,
  weight: 3354
};

// Also, more items could be added to tuples as long as it is among the tuple types.
// carSpecs.push("12");  // Error!
carSpecs.push(12);  // No error!