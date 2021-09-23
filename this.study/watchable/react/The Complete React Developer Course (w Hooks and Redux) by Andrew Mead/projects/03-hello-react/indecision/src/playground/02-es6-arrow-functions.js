function square(x) {
  return x * x;
}

const squareAnon = function (x) {
  return x * x;
};

// const squareArrow = (x) => {
//   return x * x;
// };

const squareArrow = (x) => x * x;

console.log(square(8));
console.log(squareAnon(8));
console.log(squareArrow(8));

// Challenge

// const getFirstName = (fullName) => {
//   return fullName.split(" ")[0];
// };

const getFirstName = (fullName) => fullName.split(" ")[0];

console.log(getFirstName("Mike Smith"));
