/*
let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = { name: "Umbrella" };

let products = [hat, gloves, umbrella];

// The following line gives compiler error because "products" is implicitly
// typed { name: string; }
products.forEach((product) => console.log(`${product.name}: ${product.price}`));
*/

/*
//-- Using object shape type annotations

let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
// let umbrella = { name: "Umbrella" };

// To match a type, an object must define all the properties in the shape. The
// compiler will still match an object if it has additional properties that are
// not defined by the shape type.
let umbrella = { name: "Umbrella", price: 30, waterproof: true };

let products: { name: string; price: number }[] = [hat, gloves, umbrella];

products.forEach((product) => console.log(`${product.name}: ${product.price}`));
*/

/*
//-- Using optional properties for irregular shapes

let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = { name: "Umbrella", price: 30, waterproof: true };

let products: { name: string; price?: number; waterproof?: boolean }[] = [
  hat,
  gloves,
  umbrella
];

products.forEach((product) =>
  console.log(
    `${product.name}: ${product.price} Waterproof: ${product.waterproof}`
  )
);
*/

/*
//-- Including methods in shape types

enum Feature {
  Waterproof,
  Insulated
}

let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = {
  name: "Umbrella",
  price: 30,
  hasFeature: (feature: Feature) => feature === Feature.Waterproof
};

let products: {
  name: string;
  price?: number;
  hasFeature?(feature: Feature): boolean;
}[] = [hat, gloves, umbrella];

products.forEach((product) =>
  console.log(
    `${product.name}: ${product.price} Waterproof: ${
      product.hasFeature ? product.hasFeature(Feature.Waterproof) : "false"
    }`
  )
);
*/

/*
//-- Using type aliasses for shape types

enum Feature {
  Waterproof,
  Insulated
}

type Product = {
  name: string;
  price?: number;
  hasFeature?(feature: Feature): boolean;
};

let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = {
  name: "Umbrella",
  price: 30,
  hasFeature: (feature: Feature) => feature === Feature.Waterproof
};

// The TypeScript compiler is good at inferring types, which means that type
// annotations can often be omitted. There are times, however, when providing
// the compiler with information about types can change its behavior.

let mirrorShades = { name: "Sunglasses", price: 54, finish: "mirrored" };
// The compiler treats the mirrorShades and darkShades objects differently, even
// though they have the same shape. The compiler reports errors when object
// literals with type annotations define additional properties, because this
// is likely to be a mistake. Excess properties do not cause errors when an
// object is defined without a type annotation. We can prevent the error by
// removing the excess property or by removing the type annotation, but my
// preference is to disable excess property checking entirely because I find
// it counterintuitive ("suppressExcessPropertyErrors" compiler option).
let darkShades: Product = { name: "Sunglasses", price: 54, finish: "flat" };

let products: Product[] = [hat, gloves, umbrella, mirrorShades, darkShades];

products.forEach((product) =>
  console.log(
    `${product.name}: ${product.price} ${
      product.hasFeature ? product.hasFeature(Feature.Waterproof) : "false"
    }`
  )
);
*/

/*
//-- Using shape type unions: This isn’t a useful feature when dealing with
// unions of primitive data types because there are few common properties, but
// it is a more useful feature when dealing with objects.

type Product = {
  id: number;
  name: string;
  price?: number;
};

type Person = {
  id: string;
  name: string;
  city: string;
};

type UnionType = {
  id: number | string;
  name: string;
};

let hat = { id: 1, name: "Hat", price: 100 };
let gloves = { id: 2, name: "Gloves", price: 75 };
let umbrella = { id: 3, name: "Umbrella", price: 30 };
let bob = { id: "bsmith", name: "Bob", city: "London" };

// let dataItems: (Product | Person)[] = [hat, gloves, umbrella, bob];

// When a union of shape types is created, the types of each common property
// are combined, also using a union, hence why the following works.
let dataItems: UnionType[] = [hat, gloves, umbrella, bob];

// These are the only properties that can be accessed because they are the only
// properties shared by all types in the union.
dataItems.forEach((item) => console.log(`ID: ${item.id}, Name: ${item.name}`));
*/

/*
//-- Using type guards for objects:  The typeof keyword is a standard JavaScript
// feature that the TypeScript compiler recognizes and uses during the type-checking
// process. But the typeof keyword cannot be used with objects because it will
// always return the same result. The shape type feature is provided entirely by
// TypeScript, and all objects have the type object as far as JavaScript is
// concerned, with the result that the typeof keyword isn’t useful for determining
// whether an object conforms to a specific shape.

type Product = {
  id: number;
  name: string;
  price?: number;
};

type Person = {
  id: string;
  name: string;
  city: string;
};

let hat = { id: 1, name: "Hat", price: 100 };
let gloves = { id: 2, name: "Gloves", price: 75 };
let umbrella = { id: 3, name: "Umbrella", price: 30 };
let bob = { id: "bsmith", name: "Bob", city: "London" };

let dataItems: (Product | Person)[] = [hat, gloves, umbrella, bob];

dataItems.forEach((item) => {
  // The simplest way to differentiate between shape types is to use the
  // JavaScript in keyword to check for a property.
  if ("city" in item) {
    // Compiler infers Person
    console.log(`ID: ${item.id}: ${item.city}`);
  } else {
    // Compiler infers Product
    console.log(`ID: ${item.id}: ${item.price}`);
  }

  // It is important to create type guard tests that definitively and accurately
  // differentiate between types. if the compiler gives you unexpected errors
  // when you have used a type guard, then the likely cause is an inaccurate test.

  // These are defined by both the Person and Product types, and the test doesn’t
  // give the compiler enough information to infer a type.
  // if ("id" in item && "name" in item) { ... } else { ... }

  // Testing for optional properties work in the if block, but the else block
  // can't be inferred by the compiler and will result to the union type itself.
  // if ("price" in item) { ... } else { ... }
});
*/

/*
//-- Type guarding with a "type predicate function". The in keyword is a useful
// way to identify whether an object conforms to a shape, but it requires the
// same checks to be written each time types need to be identified. TypeScript
// also supports guarding object types using a function.

type Product = {
  id: number;
  name: string;
  price?: number;
};

type Person = {
  id: string;
  name: string;
  city: string;
};

let hat = { id: 1, name: "Hat", price: 100 };
let gloves = { id: 2, name: "Gloves", price: 75 };
let umbrella = { id: 3, name: "Umbrella", price: 30 };
let bob = { id: "bsmith", name: "Bob", city: "London" };

let dataItems: (Product | Person)[] = [hat, gloves, umbrella, bob];

// Type guarding for objects is done with a type predicate function that uses
// the "is" keyword. The result of the function, which is a "type predicate",
// tells the compiler which of the function's parameters is being tested and
// the type that the function checks for. If the result of the function is
// true, then the TypeScript compiler will treat the object as the specified type.
// The are no restrictions on the name of the type guard function, but the
// convention is to prefix the guarded type with is, such that a function that
// tests for the Person type is named isPerson and a function that tests for
// the Product type is named isProduct.
const isPerson = (testObj: any): testObj is Person => {
  return testObj.city !== undefined;
};

dataItems.forEach((item) => {
  if (isPerson(item)) {
    console.log(`ID: ${item.id}: ${item.city}`);
  } else {
    console.log(`ID: ${item.id}: ${item.price}`);
  }
});
*/

/*
//-- Using type intersections: Type intersections combine the features of
// multiple types, allowing all the features to be used. This is in contrast
// to type unions, which only allow the use of common features.

type Person = {
  id: string;
  name: string;
  city: string;
};

type Employee = {
  id: string;
  company: string;
  dept: string;
};

type EmployedPerson = Person & Employee;

// Using intersections for data correlation
const correlateData = (
  peopleData: Person[],
  staff: Employee[]
): EmployedPerson[] => {
  const defaults = { company: "None", dept: "None" };
  return peopleData.map((p) => ({
    ...p,
    ...(staff.find((e) => e.id === p.id) || { ...defaults, id: p.id })
  }));
};

let people: Person[] = [
  { id: "bsmith", name: "Bob Smith", city: "London" },
  { id: "ajones", name: "Alice Jones", city: "Paris" },
  { id: "dpeters", name: "Dora Peters", city: "New York" }
];

let employees: Employee[] = [
  { id: "bsmith", company: "Acme Co", dept: "Sales" },
  { id: "dpeters", company: "Acme Co", dept: "Development" }
];

let dataItems: EmployedPerson[] = correlateData(people, employees);

// An object will conform to the shape of a type intersection only if it defines
// the properties defined by merging all the types in that intersection.
// let bob = {
//   id: "bsmith",
//   name: "Bob",
//   city: "London",
//   company: "Acme Co",
//   dept: "Sales"
// };
// let dataItems: (Person & Employee)[] = [bob];

dataItems.forEach((item) => {
  console.log(`Person: ${item.id}, ${item.name}, ${item.city}`);
  console.log(`Employee: ${item.id}, ${item.company}, ${item.dept}`);
});
*/

/*
//-- Understanding intersection merging

type Person = {
  id: string;
  name: string;
  city: string;
};

type Employee = {
  id: string;
  company: string;
  dept: string;
};

type EmployedPerson = Person & Employee;

// Using intersections for data correlation
const correlateData = (
  peopleData: Person[],
  staff: Employee[]
): EmployedPerson[] => {
  const defaults = { company: "None", dept: "None" };
  return peopleData.map((p) => ({
    ...p,
    ...(staff.find((e) => e.id === p.id) || { ...defaults, id: p.id })
  }));
};

let people: Person[] = [
  { id: "bsmith", name: "Bob Smith", city: "London" },
  { id: "ajones", name: "Alice Jones", city: "Paris" },
  { id: "dpeters", name: "Dora Peters", city: "New York" }
];

let employees: Employee[] = [
  { id: "bsmith", company: "Acme Co", dept: "Sales" },
  { id: "dpeters", company: "Acme Co", dept: "Development" }
];

let dataItems: EmployedPerson[] = correlateData(people, employees);

const writePerson = (person: Person): void => {
  console.log(`Person: ${person.id}, ${person.name}, ${person.city}`);
};

const writeEmployee = (employee: Employee): void => {
  console.log(
    `Employee: ${employee.id}, ${employee.company}, ${employee.dept}`
  );
};

// Because an intersection combines features from multiple types, an object that
// conforms to the intersection shape also conforms to each of the types in
// the intersection. The compiler matches an object to a shape by ensuring that
// it defines all the properties in the shape and doesn’t care about excess
// properties (except when defining an object literal, as explained earlier in
// the chapter).
dataItems.forEach((item) => {
  writePerson(item);
  writeEmployee(item);
});

// It may seem obvious that an intersection type is compatible with each of its
// constituents, but it has an important effect when the types in the intersection
// define properties with the same name: the type of the property in the intersection
// is an intersection of the individual property types.

// - Merging properties with the same type: merged into the intersection without
// any changes.

// - Merging properteis with different types: If there are properties with the
// same name but different types, the compiler keeps the property name but
// intersects the type. However, if teh same property's type is a primitive,
// the compiler will make the result tyep "never" instead of intersection because
// there are no values that can be assigned to the intersection of the primitive.

type A = {
  id: string;
  name: number;
  city: string;
  contact: { address: string };
};

type B = {
  id: string;
  company: string;
  dept: string;
  contact: { street: string };
};

type AB = A & B;

let typeTest = ({} as AB).contact;
*/

//-- Merging methods: If the types in an intersection define methods with the
// same name, then the compiler will create a function whose signature is
// an intersection.

type Person = {
  id: string;
  name: string;
  city: string;
  getContact(field: string): string;
};

type Employee = {
  id: string;
  company: string;
  dept: string;
  getContact(field: number): number;
};

type EmployedPerson = Person & Employee;

let person: EmployedPerson = {
  id: "bsmith",
  name: "Bob Smith",
  city: "London",
  company: "Acme Co",
  dept: "Sales",
  getContact(field: string | number): any {
    return typeof field === "string" ? "Alice" : 123123123;
  }
};

let typeTest = person.getContact;
let stringParamTypeTest = person.getContact("Alice");
let numberParamTypeTest = person.getContact(123);

console.log(`Contact: ${person.getContact("Alice")}`);
console.log(`Contact: ${person.getContact(12)}`);
