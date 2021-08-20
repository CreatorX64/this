// For function arguments, we have to always use type annotations because they
// cannot get inferred by the TypeScript compiler. For the return type of the
// function, type inference works, but it's still better to annotate the return
// type because we might not always return the correct type for TypeScript to
// infer the correct return type. Annotating the return type of a function will
// make it clear to the future you or to some other engineer that the function
// should return a specific type of value

// We made a mistake, and TypeScript can do nothing to warn us about it if we
// don't annotate the return type
const subtract = (a: number, b: number) => {
  a - b;
};

// Annotating arrow functions
const add = (a: number, b: number): number => {
  return a + b;
};

// Annotating function declarations
function divide(a: number, b: number): number {
  return a / b;
}

// Annotating anonymous function expressions
const multiply = function (a: number, b: number): number {
  return a * b;
};

// "void" and "never"

const logger = (message: string): void => {
  console.log(message);
  // return null;  // This works
  // return undefined;  // This works
  // return "asdfg";  // This doesn't work
};

// There is no chance that this will return
const throwError = (message: string): never => {
  throw new Error(message);
  // return null;  // This doesn't works
  // return undefined;  // This doesn't works
  // return "asdfg";  // This doesn't work
};

// There is a chance that this might return
const throwErrorIfMessage = (message: string): void => {
  if (message) {
    throw new Error(message);
  }
};

// Destructuring with type annotations

const todaysWeather = {
  date: new Date(),
  weather: "sunny"
};

// const logWeather = (forecast: { date: Date; weather: string }): void => {
//   console.log(forecast.date.toLocaleDateString());
//   console.log(`Today is ${forecast.weather}!`);
// };
const logWeather = ({ date, weather }: { date: Date; weather: string }): void => {
  console.log(date.toLocaleDateString());
  console.log(`Today is ${weather}!`);
};

logWeather(todaysWeather);