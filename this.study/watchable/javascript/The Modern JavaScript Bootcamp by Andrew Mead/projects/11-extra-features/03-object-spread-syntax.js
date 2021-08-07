let house =
{
  bedrooms: 2,
  bathrooms: 1.5,
  yearBuilt: 2017
};

let newHouse =
{
  basement: true,
  bedrooms: 3,
  ...house,
  // bedrooms: 3,
}

// console.log(house);
// console.log(newHouse);

// Challenge.

const person =
{
  name: "Andrew",
  age: 27
};

const location =
{
  city: "Philadephia",
  country: "USA"
};

const overview =
{
  ...person,
  ...location
};

console.log(overview);