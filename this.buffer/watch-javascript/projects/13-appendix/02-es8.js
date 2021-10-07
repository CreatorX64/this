//-- String padding

"Turtle".padStart(10); // "    Turtle"
"Turtle".padEnd(10); // "Turtle    "

//-- Trailing commas in function parameters

// prettier-ignore
const func = (a, b, c, d,) => console.log(a);

//-- Object values and entries

let obj = {
  uname0: "santa",
  uname1: "rudolf",
  uname2: "grinch"
};

// In older versions of JS we had Object.keys()
Object.keys(obj).forEach((key, idx) => console.log(key, obj[key]));

// With ES8, we have two other methods: .values() and .entries()
Object.values(obj).forEach((value) => console.log(value));
Object.entries(obj).forEach((entry) => console.log(entry[0], entry[1]));
