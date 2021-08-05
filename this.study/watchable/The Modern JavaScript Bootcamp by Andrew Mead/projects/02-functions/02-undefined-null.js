// Undefined variable.

let name;

name = "Jen";

if (name === undefined)
{
  console.log("Please provide a name.");
}
else
{
  console.log(name);
}

// Undefined function arguments.

let square = function (num)
{
  console.log(num);
};

square();

// Undefined return values.

let result = square();
console.log(result);

// Null as assigned "absence of value" value.

let age = 27;

age = null;

console.log(age);