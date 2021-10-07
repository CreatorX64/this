// In JavaScript, objects are basically hash tables.

// When you have a collision, the insert & access operations become O(n). This
// can happen even without the keys being the same, because keys are run through
// a hash function and that function generates memory addresses within certain
// bounds. So it is quite possible that two keys might generate the same address.
// In that case, the items will be stored in that memory location in a
// linked-list-like structure. That's why using hash tables all the time is a
// bad idea. There are things it's good at, and there are things it's not that
// good at.

let user = {
  age: 54,
  name: "Kylie",
  magic: true,
  scream() {
    console.log("ahhhh!");
  }
};

console.log(user.age); // O(1)
user.spell = "abra kadabra"; // O(1)
user.scream(); // O(1)

// With new versions of JavaScript (ES6+) we have Map and Set.

// Can have any data type as key. It maintains the insertion order.
const a = new Map();

// Doesn't store values, only keys. All keys are unique.
const b = new Set();
