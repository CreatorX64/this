//-- Built-in generic types
/*
// const names: string[] = ["Max", "Manuel"];
const names: Array<string> = ["Max", "Manuel"];

// console.log(names[0].split(""));

const promise = new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});

promise.then((data) => {
  console.log(data.toUpperCase());
});
*/

//-- Creating generic types & generic type constraints

function merge<T extends object, U extends object>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}

// Generic types are inferred from the arguments.
const mergedObj = merge(
  { name: "Max", hobbies: ["Sports", "Music"] },
  { age: 23 }
);
console.log(mergedObj.age);
console.log(mergedObj.hobbies);
console.log(mergedObj.name);

// We can set generic types explicitly.
const mergedObj2 = merge<{ name: string }, { age: number }>(
  { name: "Jen" },
  { age: 12 }
);
console.log(mergedObj2.name);
console.log(mergedObj2.age);

// Error! Argument types don't conform to the generic type constraints.
// const mergedObj3 = merge("Jonathan", 3);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no elements.";

  if (element.length === 1) {
    descriptionText = `Got 1 element.`;
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements.`;
  }

  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!"));
console.log(countAndDescribe(["Sports", "Cooking"]));
console.log(countAndDescribe([]));

//-- The "keyof" constraint

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
): string {
  return `Value: ${obj[key]}`;
}

// console.log(extractAndConvert({ name: "Clementine" }, "age")); // Error!
console.log(extractAndConvert({ name: "Clementine" }, "name"));

//-- Generic classes

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  removeItem(item: T): void {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems(): T[] {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
console.log(textStorage.getItems());
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(2);
numberStorage.addItem(12);
numberStorage.addItem(2.56);
console.log(numberStorage.getItems());

// const objStorage = new DataStorage<object>();
// const maxObj = { name: "Max" };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: "Manu" });
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

//-- Generic utility types

// Partial<> type

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  // Partial type can temporarily convert your CourseGoal type into a type
  // where all of its properties are optional.
  let courseGoal: Partial<CourseGoal> = {};

  // ... Perhapns you have extra validation logic here.

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;

  return courseGoal as CourseGoal;
}

// Readonly<> type

const names: Readonly<string[]> = ["Max", "Anna"];
// names.push("Manu"); // Error!
// names.pop(); // Error!

// Note: Readonly can work with other types as well, like objects.
