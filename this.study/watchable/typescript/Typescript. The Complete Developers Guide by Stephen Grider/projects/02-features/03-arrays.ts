// const carMakers: string[] = ["ford", "toyota", "chevy"];
// const carMakers = [];  // Inferred type: any[]
// const carMakers: string[] = [];  // Annotate the array if intially empty
const carMakers = ["ford", "toyota", "chevy"];  // Type inference will take effect
const dates = [new Date(), new Date()];  // Inferred type: Date[]

const carsByMake = [  // Inferred type: string[][]
  ["f150"],
  ["corolla"],
  ["camaro"]
];

// Typed arrays help with type inference when extracting values
const car = carMakers[0];  // Inferred type: string
const myCar = carMakers.pop();  // Inferred type: string

// Typed arrays help with preventing incompatible values
// carMakers.push(100);  // Error!

// Typed arrays help with providing useful array methods like map, filter, reduce
carMakers.map((car) => {  // The argument & return type are inferred thanks to typed array
  return car.substring(2);
});

// Arrays can have flexible types
// const importantDates = [new Date(), "2030-10-10"];  // Inferred type: (string | Date)[]
const importantDates: (string | Date)[] = [new Date()];
importantDates.push("2030-10-10");
importantDates.push(new Date());
// importantDates.push(123);  // Error!