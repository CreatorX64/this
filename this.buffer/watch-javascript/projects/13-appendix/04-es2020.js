//-- BigInt

// Calculations above this number will not yield expected results.
Number.MAX_SAFE_INTEGER; // 9007199254740991

typeof 999999999999999999999999999999999999999999999999999; // number
typeof 9n; // bigint

// BigInt is used when we want to use a number that's larger than
// Number.MAX_SAFE_INTEGER.

let myCorrectResult = 9007199254740999n + 10n;

//-- Optional Chaining Operator: ?.

let willPokemon = {
  pikachu: {
    species: "Mouse Pokemon",
    height: 0.4,
    weight: 6
  }
};

let andreiPokemon = {
  raichu: {
    species: "Mouse Pokemon",
    height: 0.8,
    weight: 30
  }
};

let weight = willPokemon.pikachu.weight;
console.log("weight:", weight);

// let weight2 = andreiPokemon.pikachu.weight; // TypeError
let weight2 = andreiPokemon?.pikachu?.weight; // No error! weight2 is undefined
console.log("weight2:", weight2);

//-- Nullish Coalescing Operator: ??: It has the same logic of using ||
// operator to provide a default value, but ?? operator only passes if the
// left operand is undefined or null whereas the || operator passes any
// falsy value.

let myPokemon = {
  pikachu: {
    species: "Mouse Pokemon",
    height: 0.8,
    weight: 30,
    // power: ""
    // power: 0
    power: false
  }
};

// let power = myPokemon?.pikachu?.power || "no power"; // "no power"
let power = myPokemon?.pikachu?.power ?? "no power"; // ""

//-- globalThis: This is a binding available in the global scope that points to the global object in environments such as Node and the browser. It was added because with ES2020, they wanted to unify different platforms outside of the browser so that there's a global variable each one of them can access.

// In browser:
console.log(globalThis); // "window" object

// In Node:
console.log(globalThis); // "global" object
