// JavaScript uses "lexical scope (static scope)".
//   - Global scope: Defined outsite of all code blocks.
//   - Local scope: Defined inside a code block.

// In a scope, you can access variables defined in that scope or in any parent/ancestor scope.

// Global scope (varOne)
//   Local scope (varTwo)
//     Local scope (varFour)
//   Local scope (varThree)

let varOne = "varOne";

if (true)
{
  console.log(varOne);
  let varTwo = "varTwo";
  console.log(varTwo);

  if (true)
  {
    let varFour = "varFour";
  }
}

if (true)
{
  let varThree = "varThree";
}

console.log(varTwo);