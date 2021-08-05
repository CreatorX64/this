// Basics of closures.

// const myFunction = () =>
// {
//   const message = "This is my message";
//   const printMessage = () =>
//   {
//     console.log(message);
//   };
//   return printMessage;
// };
// const myPrintMessage = myFunction();
// myPrintMessage();

// Creating a private variable using closures.

const createCounter = () =>
{
  let count = 0;

  return {
    increment()
    {
      count++;
    },
    decrement()
    {
      count--;
    },
    get()
    {
      return count;
    }
  };
};

// Currying refers to the process of transforming a single function that takes
// a lot of arguments to multiple functions that take subset of those arguments.
// For instance, the function below is the curried version of the function
// "const add = (a, b) => a + b".
const createAdder = a =>
{
  return b => {
    return a + b;
  };
};

const counter = createCounter();
counter.increment();
counter.decrement();
counter.decrement();
console.log(counter.get());

const add10 = createAdder(10);
console.log(add10(-2));
console.log(add10(20));
const add100 = createAdder(100);
console.log(add100(-90));

// Challenge.

const createTipper = baseTip =>
{
  return amount => baseTip * amount;
};

const tip20 = createTipper(0.2);
const tip30 = createTipper(0.3);
console.log(tip20(100));
console.log(tip30(100));