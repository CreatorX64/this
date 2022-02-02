/*
//-- Using constructor functions

type Person = {
  id: string;
  name: string;
  city: string;
};

// The TypeScript compiler may not understand the significance of the constructor
// function, but it can match the objects it creates by shape. For convenience,
// I have given the shape type an alias that matches the name of the constructor
// function, but that is optional because the compiler keeps track of variable
// names and type names separately.
type Employee = {
  id: string;
  name: string;
  dept: string;
  city: string;
  writeDept: () => void;
};

let Employee = function (id: string, name: string, dept: string, city: string) {
  this.id = id;
  this.name = name;
  this.dept = dept;
  this.city = city;
};
Employee.prototype.writeDept = function () {
  console.log(`${this.name} works in ${this.dept}`);
};

let salesEmployee = new Employee("fvega", "Fidel Vega", "Sales", "Paris");

let data: (Person | Employee)[] = [
  { id: "bsmith", name: "Bob Smith", city: "London" },
  { id: "ajones", name: "Alice Jones", city: "Paris" },
  { id: "dpeters", name: "Dora Peters", city: "New York" },
  salesEmployee
];

data.forEach((item) => {
  // The TypeScript compiler isn’t able to use the instanceof operator as a type
  // guard for objects created by a constructor function.
  // if (item instanceof Employee) { ... }

  if ("dept" in item) {
    item.writeDept();
  } else {
    console.log(`${item.id} ${item.name}, ${item.city}`);
  }
});
*/

/*
//-- Using classes

type Person = {
  id: string;
  name: string;
  city: string;
};

class Employee {
  // The access protection features are enforced by the typescript compiler and
  // are not part of the Javascript code that the compiler generates. do not
  // rely on the private or protected keyword to shield sensitive data because
  // it will be accessible to the rest of the application at runtime.

  // The readonly keyword can be used to create instance properties whose value
  // is assigned by the constructor but cannot otherwise be changed. the readonly
  // keyword is enforced by the typescript compiler and does not affect the Javascript
  // code that the compiler generates. do not use this feature to protect sensitive
  // data or operations.
  public readonly id: string;

  public name: string;
  public city: string;
  // private dept: string;

  // Using JavaScript private fields. However, you should still use TypeScript
  // "private" keyword, at least until private fields become part of the
  // JavaScript specification. The key advantage over the TypeScript private
  // keyword is that the # character is not removed during the compilation
  // process, which means that access control is enforced by the JavaScript
  // runtime.  This feature applies only to fields and cannot be used with
  // methods. There is a proposal for private methods, but it isn’t yet supported
  // by the TypeScript compiler. And because this feature is not part of the
  // JavaScript language specification, the TypeScript compiler implements the
  // feature indirectly by adding code to the JavaScript output. If you know
  // that your target runtime supports the proposed private fields feature, then
  // you can include the private fields in the compiled JavaScript code by selecting
  // the ESNext version in the tsconfig.json file. No configuration option enables
  // just the private fields feature, so you must make sure that your JavaScript
  // runtime supports all the features that are enabled by the ESNext target
  // version, which changes from release to release.
  #dept: string;

  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.#dept = dept;
  }

  writeDept(): void {
    // console.log(`${this.name} works in ${this.dept}`);
    console.log(`${this.name} works in ${this.#dept}`);
  }
}

let salesEmployee = new Employee("fvega", "Fidel Vega", "Sales", "Paris");

// console.log(`Dept value: ${salesEmployee.dept}`); // Error! private field
salesEmployee.writeDept();

// salesEmployee.id = "fidel"; // Error! readonly field

// let data: (Person | Employee)[] = [
//   { id: "bsmith", name: "Bob Smith", city: "London" },
//   { id: "ajones", name: "Alice Jones", city: "Paris" },
//   { id: "dpeters", name: "Dora Peters", city: "New York" },
//   salesEmployee
// ];

// data.forEach((item) => {
//   if (item instanceof Employee) {
//     item.writeDept();
//   } else {
//     console.log(`${item.id} ${item.name}, ${item.city}`);
//   }
// });
*/

/*
//-- Simplifying class constructors

class Employee {
  // TypeScript supports a more concise syntax for constructors that avoids the
  // “define and assign” pattern. The compiler automatically creates an instance
  // property for each of the constructor arguments to which an access control
  // keyword has been applied and assigns the parameter value. The use of the access
  // control keywords doesn’t change the way the constructor is invoked and is
  // required only to tell the compiler that corresponding instance variables are
  // required. The concise syntax can be mixed with conventional parameters
  // if required
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    // No statements required.
  }

  writeDept(): void {
    console.log(`${this.name} works in ${this.dept}`);
  }
}

let salesEmployee = new Employee("fvega", "Fidel Vega", "Sales", "Paris");
salesEmployee.writeDept();
*/

/*
//-- Using class inheritance: TypeScript builds on the standard class inheritance
// features to make them more consistent and familiar, with some useful additions
// for commonly required tasks and for restricting some of the JavaScript
// characteristics that can cause problems.

class Person {
  constructor(public id: string, public name: string, public city: string) {}
}

class Employee extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    // When using the extends keyword, TypeScript requires that the superclass
    // constructor is invoked using the super keyword, ensuring that its
    // properties are initialized.
    super(id, name, city);
  }

  writeDept(): void {
    console.log(`${this.name} works in ${this.dept}`);
  }
}

// Inferred type: Person[]
let data = [
  new Person("bsmith", "Bob Smith", "London"),
  new Employee("fvega", "Fidel Vega", "Sales", "Paris")
];

data.forEach((item) => {
  console.log(`Person: ${item.name}, ${item.city}`);

  if (item instanceof Employee) {
    item.writeDept();
  }
});
*/

/*
//-- Understanding type inference for subclasses
// If you are familiar with other programming languages, you might reasonably
// assume that the compiler has realized that Employee is a subclass of Person
// and that all the objects in the array can be treated as Person objects. In
// reality, the compiler creates a union of the types the array contains, which
// would be Person | Employee, and determines that this is equivalent to Person
// since a union only presents the features that are common to all types. It is
// important to remember that the compiler pays attention to object shapes, even
// if the developer is paying attention to classes. This can appear to be an
// unimportant difference, but it has consequences when using objects that share
// a common superclass.

class Person {
  constructor(public id: string, public name: string, public city: string) {}
}

class Employee extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    super(id, name, city);
  }

  writeDept(): void {
    console.log(`${this.name} works in ${this.dept}`);
  }
}

class Customer extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public creditLimit: number
  ) {
    super(id, name, city);
  }
}

class Supplier extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public companyName: string
  ) {
    super(id, name, city);
  }
}

// This example won’t compile because the TypeScript compiler has inferred the
// type for the data array based on the types of the objects it contains and
// has not reflected the shared superclass. The array can only contain Employee
// or Customer objects, and the errors are reported because a Supplier object
// is added. To resolve this problem, a type annotation can be used to tell
// the compiler that the array can contain Product objects.

// Inferred type: (Employee | Customer)[]
// let data = [
//   new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
//   new Customer("ajones", "Alice Jones", "London", 500)
// ];

let data: Person[] = [
  new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
  new Customer("ajones", "Alice Jones", "London", 500)
];

data.push(new Supplier("dpeters", "Dora Peters", "New York", "Acme"));

data.forEach((item) => {
  console.log(`\nPerson: ${item.name}, ${item.city}`);

  if (item instanceof Employee) {
    item.writeDept();
  } else if (item instanceof Customer) {
    console.log(`Customer ${item.name} has ${item.creditLimit} limit`);
  } else if (item instanceof Supplier) {
    console.log(`Supplier ${item.name} works for ${item.companyName}`);
  }
});
*/

/*
//-- Using an abstract class: Abstract classes cannot be instantiated directly
// and are used to describe common functionality that must be implemented by
// subclasses, forcing subclasses to adhere to a specific shape but allowing
// class-specific implementations of specific methods.

abstract class Person {
  constructor(public id: string, public name: string, public city: string) {}

  // When a class extends an abstract class, it must implement all the
  // abstract methods.
  abstract getSpecificDetails(): string;

  getDetails(): string {
    return `${this.name}, ${this.getSpecificDetails()}`;
  }
}

class Employee extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    private dept: string,
    public city: string
  ) {
    super(id, name, city);
  }

  getSpecificDetails(): string {
    return `works in ${this.dept}`;
  }
}

class Customer extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public creditLimit: number
  ) {
    super(id, name, city);
  }

  getSpecificDetails(): string {
    return `has ${this.creditLimit} limit`;
  }
}

class Supplier extends Person {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public companyName: string
  ) {
    super(id, name, city);
  }

  getSpecificDetails(): string {
    return `works for ${this.companyName}`;
  }
}

// Objects instantiated from classes derived from an abstract class can be used
// through the abstract class type, which means that the Employee, Customer,
// and Supplier objects can be stored in a Person array, although only the
// properties and methods defined by the Person class can be used unless objects
// are narrowed to a more specific type.
// let data: Person[] = [
//   new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
//   new Customer("ajones", "Alice Jones", "London", 500),
//   new Supplier("dpeters", "Dora Peters", "New York", "Acme")
// ];
// data.forEach((item) => console.log(item.getDetails()));

//-- Type guarding abstract classes
// Abstract classes are implemented as regular classes in the JavaScript
// generated by the TypeScript compiler. The drawback of this approach is that it
// is the TypeScript compiler that prevents abstract classes from being instantiated,
// and this isn’t carried over into the JavaScript code, potentially allowing
// objects to be created from the abstract class. However, this approach does mean
// that the instanceof keyword can be used to narrow types.

class Student {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public gpa: number
  ) {}
}

let data: (Person | Student)[] = [
  new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
  new Student("ajones", "Alice Jones", "London", 4)
];

data.forEach((item) => {
  // Employee extends the abstract Person class, but the Student class does not.
  // The instanceof operator can be used to identify any object instantiated from
  // a class that extends the abstract class, which allows narrowing in the
  // Person | Student union used as the type for the array.
  if (item instanceof Person) {
    console.log(item.getDetails());
  } else {
    console.log(`Student: ${item.name}, GPA: ${item.gpa}`);
  }
});
*/

/*
//-- Using interfaces: Interfaces are used to describe the shape of an object,
// which a class that implements the interface must conform to. interfaces have
// a similar purpose to shape types, described in Chapter 10, and successive
// versions of typescript have eroded the differences between these two features,
// to the point where they can often be used interchangeably to achieve the same
// effect, especially when dealing with simple types. interfaces do have some
// useful features, however, and they provide a development experience that is
// more consistent with other languages, such as C#.

// Interfaces can be defined in multiple interface declarations, which are merged
// by the compiler to form a single interface. this is an odd feature—and one that
// i have yet to find useful in my own projects. the declarations must be made in
// the same code file, and they must all be exported (defined with the export
// keyword) or defined locally (defined without the export keyword).

// Unlike abstract classes, interfaces don’t implement methods or define a
// constructor and just define a shape.
interface Person {
  name: string;
  getDetails(): string;
}

// interface DogOwner {
//   dogName: string;
//   getDogDetails(): string;
// }

// Extending interfaces
interface DogOwner extends Person {
  dogName: string;
  getDogDetails(): string;
}

class Employee implements Person {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    private dept: string
  ) {}

  getDetails(): string {
    return `${this.name} works in ${this.dept}`;
  }
}

// A class can implement multiple interfaces only if there are no overlapping
// properties with conflicting types. for example, if the Person interface
// defined a string property named id and if the DogOwner interface defined a
// number property with the same name, the Customer class would not be able to
// implement both interfaces because there is no value that could be assigned
// to its id property that could represent both types.
// class Customer implements Person, DogOwner { ... }

class Customer implements DogOwner {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    private creditLimit: number,
    public dogName: string
  ) {}

  getDetails(): string {
    return `${this.name} has ${this.creditLimit} limit`;
  }

  getDogDetails(): string {
    return `${this.name} has a dog named ${this.dogName}`;
  }
}

let alice = new Customer("ajones", "Alice Jones", "London", 500, "Fido");

let dogOwners: DogOwner[] = [alice];
dogOwners.forEach((item) => console.log(item.getDogDetails()));

// The data array can contain any object created from a class that implements
// the Product array, although the function passed to the forEach method can
// access only the features defined by the interface unless objects are narrowed
// to a more specific type.
let data: Person[] = [
  new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
  alice // alice IS A Person, so we can add it here
];
data.forEach((item) => console.log(item.getDetails()));

// Shape types and interfaces can often be used interchangeably. Classes can,
// for example, use the implements keyword with a shape type to indicate they
// implement the properties in the shape:

// type Person = {
//   name: string;
//   getDetails(): string;
// }

// class Employee implements Person { ... }

// Interfaces can also conform to shape types, using the extends keyword:

// type NamedObject = {
//   name: string;
// }

// interface Person extends NameObject {
//   getDetails(): string;
// }
*/

/*
//-- Defining optional interface properties and methods

interface Person {
  name: string;
  dogName?: string;
  getDetails(): string;
  getDogDetails?(): string;
}

class Employee implements Person {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    private dept: string
  ) {}

  getDetails(): string {
    return `${this.name} works in ${this.dept}`;
  }
}

class Customer implements Person {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    private creditLimit: number,
    public dogName: string
  ) {}

  getDetails(): string {
    return `${this.name} has ${this.creditLimit} limit`;
  }

  getDogDetails(): string {
    return `${this.name} has a dog named ${this.dogName}`;
  }
}

let alice = new Customer("ajones", "Alice Jones", "London", 500, "Fido");
let data: Person[] = [
  new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
  alice
];
data.forEach((item) => {
  console.log(item.getDetails());
  if (item.getDogDetails) {
    console.log(item.getDogDetails());
  }
});
*/

/*
//-- Defining an abstract interface implementation: Abstract classes can be used
// to implement some or all of the features described by an interface. This can
// reduce code duplication when some of the classes that implement an interface
// would do so, in the same way, using the same code.

interface Person {
  name: string;
  dogName?: string;
  getDetails(): string;
  getDogDetails?(): string;
}

abstract class AbstractDogOwner implements Person {
  abstract name: string;
  abstract dogName?: string;

  abstract getDetails(): string;

  getDogDetails(): string {
    if (this.dogName) {
      return `${this.name} has a dog called ${this.dogName}`;
    }
  }
}

class DogOwningCustomer extends AbstractDogOwner {
  constructor(
    public readonly id: string,
    public name: string,
    public city: string,
    public creditLimit: number,
    public dogName: string
  ) {
    super();
  }

  getDetails(): string {
    return `${this.name} has ${this.creditLimit} limit`;
  }
}

let alice = new DogOwningCustomer(
  "ajones",
  "Alice Jones",
  "London",
  500,
  "Fido"
);

console.log(alice.getDogDetails());
*/

/*
//-- Type guarding an interface: There is no JavaScript equivalent to interfaces,
// and no details of interfaces are included in the JavaScript code generated by
// the TypeScript compiler. This means that the instanceof keyword cannot be
// used to narrow interface types, and type guarding can be done only by checking
// for one or more properties that are defined by the interface.

interface Person {
  name: string;
  getDetails(): string;
}

interface Product {
  name: string;
  price: number;
}

class Employee implements Person {
  constructor(public name: string, public company: string) {}

  getDetails(): string {
    return `${this.name} works for ${this.company}`;
  }
}

class SportsProduct implements Product {
  constructor(
    public name: string,
    public category: string,
    public price: number
  ) {}
}

let data: (Person | Product)[] = [
  new Employee("Bob Smith", "Acme"),
  new SportsProduct("Running Shoes", "Running", 90.5),
  new Employee("Dora Peters", "BigCo")
];

data.forEach((item) => {
  // We use the presence of the getDetails property to identify those objects
  // that implement the Person interface, allowing the contents of the data
  // array to be narrowed to the Person or Product type.
  if ("getDetails" in item) {
    console.log(`Person: ${item.getDetails()}`);
  } else {
    console.log(`Product: ${item.name}, ${item.price}`);
  }
});
*/

//-- Dynamically creating properties: The TypeScript compiler only allows values
// to be assigned to properties that are part of an object’s type, which means
// that interfaces and classes have to define all the properties that the
// application requires. By contrast, JavaScript allows new properties to be
// created on objects simply by assigning a value to an unused property name. The
// TypeScript index signature feature bridges these two models, allowing properties
// to be defined dynamically while preserving type safety.

interface Product {
  name: string;
  price: number;
}

class SportsProduct implements Product {
  constructor(
    public name: string,
    public category: string,
    public price: number
  ) {}
}

class ProductGroup {
  // The property name type can be only string or number, but the property
  // value type can be any type.
  [propertyName: string]: Product;

  constructor(...initialProducts: [string, Product][]) {
    initialProducts.forEach((p) => (this[p[0]] = p[1]));
  }
}

let group = new ProductGroup(
  ["shoes", new SportsProduct("Shoes", "Running", 90.5)],
  ["shaker", new SportsProduct("Shaker", "GYM", 12.99)]
);

group.hat = new SportsProduct("Hat", "Skiing", 20);

Object.keys(group).forEach((key) => console.log(`Property name: ${key}`));

// One potential pitfall with index signatures is that the TypeScript compiler
// assumes that you will only access properties that exist, which is inconsistent
// with the broader approach taken by TypeScript to force assumptions into the
// open so they can be explicitly verified. To configure the compiler to check
// index signatures accesses, set the noUncheckedIndexedAccess and strictNullChecks
// configuration options to true.

// Error!
// let total = group.hat.price + group.boots.price;
// console.log(`Total: ${total}`);

// We don't actually need to check for "group.hat" because TypeScript is smart
// enough to know that we just set its value. However, to follow the book completely,
// I check both properties.
// if (group.hat && group.boots) {
//   let total = group.hat.price + group.boots.price;
//   console.log(`Total: ${total}`);
// }

// An alternative approach is to use optional chaining and the nullish operator
// to provide a fallback value.
let total = group.hat.price + (group.boots?.price ?? 0);
console.log(`Total: ${total}`);
