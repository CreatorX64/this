//-- Array.prototype.flat() method

const array = [1, [2, 3], [4, 5]];
array.flat(); // [1, 2, 3, 4, 5]

const array2 = [1, [2, [3, 4]], 5];
array2.flat(); // [1, 2, [3, 4], 5]

const array3 = [1, [2, [3, 4]], 5];
array3.flat(2); // [1, 2, 3, 4, 5]

//-- Array.prototype.flatMap() method

const jurassicParkChaos = [
  ["a", "b"],
  [1, 2, [[2, 3, 4], [5, 77, [[4, 66], 6767]], 45]]
];

// Prints: ['a,b--TREX', '1,2,2,3,4,5,77,4,66,6767,45--TREX']
const nice = jurassicParkChaos.flatMap((item) => `${item}--TREX`);

//-- String trim methods

let userEmail = "    me@me.com";
let userEmail2 = "me@me.com    ";
userEmail.trimStart(); // me@me.com
userEmail2.trimEnd(); // me@me.com

//-- Object.fromEntries() method: Basically the opposite of Object.entries()

const userProfiles = [
  ["commanderTom", 23],
  ["derekXlander", 40]
];
Object.fromEntries(userProfiles);

//-- Parameterless catch block in try-catch blocks. Before, "catch" had to have
// a parameter which received the error object.

try {
  throw new Error("Oops");
} catch {
  console.log("I don't have an error object");
}
