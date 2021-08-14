// console.log(Boolean(undefined));  // false
// console.log(Boolean(null));  // false
// console.log(Boolean(""));  // false
// console.log(Boolean(0));  // false

var a;

// ... code that goes to the Internet and looks for a value

// a = null;
// a = "";
// a = "hi";
// a = 0;

if (a)  // Coerces the value between () into a boolean
// if (a || a === 0)  // Coerces the value between () into a boolean
{
  console.log("Something is there.");
}