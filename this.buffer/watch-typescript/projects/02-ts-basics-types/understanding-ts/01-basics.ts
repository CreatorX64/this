function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  // if (typeof n1 !== "number" || typeof n2 !== "number") {
  //   throw new Error("Incorrect input!");
  // }

  const result = n1 + n2;

  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

// const number1 = 5; // Type: 5 (literal type)
// let number1 = 5; // Type: number (type inference)
// let number1: number = 5; // This is pointless...

let number1: number; // But it's a good idea here.
number1 = 5;

const number2 = 2.8;
const printResult = true;

let resultPhrase = "Result is: ";
// resultPhrase = 0; // Error: Value clashes with the inferred type!

add(number1, number2, printResult, resultPhrase);
