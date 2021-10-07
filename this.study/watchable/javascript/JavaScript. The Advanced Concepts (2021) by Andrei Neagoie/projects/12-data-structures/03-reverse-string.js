// Create a function that reverses a string.
// "Hi my name is Hakan"
// "nakaH si eman ym iH"

function reverse(text) {
  if (typeof text !== "string") {
    return null;
  } else if (text.length < 2) {
    return text;
  }

  // Short version. But we want to implement the reverse() logic ourselves.
  // return str.split("").reverse().join("");

  let reversedLetters = [];
  for (let i = text.length - 1; i >= 0; i--) {
    reversedLetters.push(text[i]);
  }
  return reversedLetters.join("");
}

console.log(reverse("Hi my name is Hakan"));
