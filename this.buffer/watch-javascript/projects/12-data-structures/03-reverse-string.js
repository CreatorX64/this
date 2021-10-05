// Create a function that reverses a string.
// "Hi my name is Hakan"
// "nakaH si eman ym iH"

function reverse(text) {
  if (typeof text !== "string" || text.length < 2) {
    return null;
  }

  // This is the short version, but we want to implement reverse logic ourselves.
  // return str.split("").reverse().join("");

  let reversedLetters = [];
  for (let i = text.length - 1; i >= 0; i--) {
    reversedLetters.push(text[i]);
  }
  return reversedLetters.join("");
}

console.log(reverse("Hi my name is Hakan"));
