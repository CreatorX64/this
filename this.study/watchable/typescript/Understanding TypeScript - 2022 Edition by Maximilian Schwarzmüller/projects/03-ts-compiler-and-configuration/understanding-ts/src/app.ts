let appId = "abc"; // No error for "noUnusedLocals". TS assumes you might use this in another file.
const button = document.querySelector("button")!;

// Error for "noImplicitReturns"!
function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return; // We need this for "noImplicitReturns"
}

// function clickHandler(message: string, age: number) { // Error for "noUnusedParameters"!
function clickHandler(message: string) {
  // let userName = "Max"; // Error for "noUnusedLocals"!
  console.log(`Clicked! ${message}`);
}

// A comment...
if (button) {
  button.addEventListener(
    "click",
    clickHandler.bind(null, "From the button handler :D")
  );
}
