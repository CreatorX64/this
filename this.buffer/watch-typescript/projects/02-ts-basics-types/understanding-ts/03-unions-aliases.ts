// Type aliases
type Combinable = number | string; // Union type
type ConversionDescriptor = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result: Combinable;

  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = Number(input1) + Number(input2);
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;

  // Another version: Convert result value after operation.
  // if (resultConversion === "as-number") {
  //   return Number(result);
  // } else {
  //   return result.toString();
  // }
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
