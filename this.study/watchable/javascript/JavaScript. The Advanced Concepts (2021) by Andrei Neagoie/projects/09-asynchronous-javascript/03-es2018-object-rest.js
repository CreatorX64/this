const animals = {
  tiger: 23,
  lion: 5,
  monkey: 2
};

const { tiger, ...rest } = animals;

console.log(tiger); // 23
console.log(rest); // { lion: 5, monkey: 2 }
