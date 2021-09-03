// interface Vehicle {
//   name: string;
//   year: Date;
//   broken: boolean;
//   getSummary(): string;
// }

// interface Vehicle {
//   getSummary(): string;
// }

// If we're only left with a function called "getSummary", then it doesn't
// make sense to call this interface "Vehicle". A better name would perhaps
// be "Reportable". So if any object wants to be considered as type Reportable,
// they need to at least have the getSummary() method.
interface Reportable {
  getSummary(): string;
}

const oldCivic = {
  name: "civic",
  year: new Date(),
  broken: true,
  getSummary(): string {
    return `Name: ${this.name}`;
  }
};

// Both the oldCivic object and this drink object model very different things,
// but they both have a getSummary method. That's why they're both considered
// Reportable in our application, so we can use either of them anywhere in
// our app where a Reportable is expected. We can use a single interface to
// describe the shape of very different objects. In doing so, we'll have much
// more reusable functions inside our applications.
const drink = {
  color: "brown",
  carbonated: true,
  sugar: 40,
  getSummary(): string {
    return `My drink has ${this.sugar} grams of sugar.`;
  }
};

// The passed in "vehicle" should satisfy the conditions defined by the
// "Vehicle" interface **at minimum**. So the "vehicle" object can include
// extra properties and functions that are not included in the interface
// const printVehicle = (vehicle: Vehicle): void => {
//   console.log(vehicle.getSummary());
// };

// It doesn't make sense to call this function printVehicle any more now
// that we're accepting a Reportable rather than a Vehicle.
const printSummary = (item: Reportable): void => {
  console.log(item.getSummary());
};

printSummary(oldCivic);
printSummary(drink);