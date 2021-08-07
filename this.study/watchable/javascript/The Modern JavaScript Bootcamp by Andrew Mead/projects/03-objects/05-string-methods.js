let name = "  Andrew Mead ";

// Length property.
console.log(name.length);

// Convert to upper case.
console.log(name.toUpperCase());

// Convert to lower case.
console.log(name.toLowerCase());

// Includes method.
let password = "abc123asdf098";
console.log(password.includes("password"));

// Trim.
console.log(name.trim());

// Challenge.

let isValidPassword = function (password)
{
  return password.length > 10 && !password.includes("password");
};

console.log(isValidPassword("asdfp"));
console.log(isValidPassword("abc123!@#$½"));
console.log(isValidPassword("lsdkjfalksdj234passwordslkdfj"));