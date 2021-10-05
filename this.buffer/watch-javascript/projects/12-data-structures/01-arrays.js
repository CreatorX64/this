// Lookup: O(1)
// Append: O(1) - but can be O(n) sometimes*
// Insert: O(n)
// Delete: O(n)
// *Arrays are dynamic in JS and not static. But despite that, if the engine
// allocates just enough space for your array and you want to append one more item
// to the end, the engine will have to allocate new space to the array and copy all
// the items to the new location one by one, which can potentially make the append
// operation O(n).

const strings = ["a", "b", "c", "d"];

console.log(strings[2]); // O(1)

strings.push("e"); // O(1)

strings.pop(); // O(1)

strings.unshift("x"); // O(n)

strings.shift(); // O(n)

strings.splice(2, 0, "alien"); // O(n)
