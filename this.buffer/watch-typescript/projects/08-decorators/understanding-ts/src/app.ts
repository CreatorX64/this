// Decorators execute when the class is first defined, not when it is used.

// Decorator to be used on a class definition.
// function Logger(constructor: Function) {
//   console.dir(constructor);
//   console.log("Logging...");
// }

// Decorator factory.
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log("---- INSIDE LOGGER DECORATOR ----");
    console.dir(constructor);
    console.log(logString);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // By returning a class, we're basically replacing the class that this
    // decorator was applied to with a modified version of that original class.
    // This shows the full power of decorators in action. You can return values
    // in other types of decorators as well, but not in all of them the return
    // value is respected. The decorator types in which you can return stuff are:
    // Class decorators, method decorators, accessor decorators. Decorators on
    // properties and parameters can also return things, but TypeScript will
    // ignore those.
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("---- INSIDE TEMPLATE DECORATOR ----");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// Multiple decorators applied to the same class are executed from bottom to the top.

// @Logger // Regular decorator
@Logger("LOGGING - PERSON") // Decorator factory
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating Person object...");
  }
}

const person = new Person();
console.log(person);

//-- Property decorators

// In following decorators, 'target' is the prototype object of the class that
// this decorator is applied to and 'propertyName' is the name of the property
// that the decorator is applied to.

// In method decorators, there's also a parameter called "descriptor". This is
// basically an object which defines meta-level properties of a class property,
// like whether if it's writable, configurable, or iterable. This is not an object
// that's specific to TypeScript, it is a JavaScript thing and it's officially called
// "property descriptor".

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
  // We can return a new descriptor here which will replace the original property descrioptor.
}

function Log3(
  target: any,
  propertyName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
  // We can return a new descriptor here which will replace the original property descrioptor.
}

function Log4(target: any, propertyName: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(propertyName);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Log2
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error("Price should be positive.");
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number): number {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 29);

// Decorators are run in the following order:
// - Class decorators
// - Property decorators
// - Accessor decorators
// - Parameter decorators
// - Method decorators

//-- Practical decorator example: Automatically binding methods.

function AutoBind(
  _1: any,
  _2: string,
  propertyDescriptor: PropertyDescriptor
): PropertyDescriptor {
  // We don't have the "writable" descriptor because we defined a getter. By
  // returning a new property descriptor, TypeScript will replace the original
  // descriptor with the one that we returned.
  return {
    configurable: true,
    enumerable: false,
    get() {
      return propertyDescriptor.value.bind(this);
    }
  };
}

class Printer {
  message = "This works!";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();
const button = document.querySelector("button")!;

if (button) {
  button.addEventListener("click", printer.showMessage);
}

//-- Practial decorator example: Validation.

// Imagine that these are in a library that you're developing.

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required"
    ]
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive"
    ]
  };
}

function validate(obj: any): boolean {
  const objValidatorConfig = registeredValidators[obj.constructor.name];

  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;

  for (const prop in objValidatorConfig) {
    for (const validationType of objValidatorConfig[prop]) {
      switch (validationType) {
        case "required":
          isValid = isValid && obj[prop] !== "";
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }

  return isValid;
}

// And the following part is the code that uses the above library.

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const formElem = document.querySelector("form")!;

formElem.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleElem = document.getElementById("title") as HTMLInputElement;
  const priceElem = document.getElementById("price") as HTMLInputElement;

  const title = titleElem.value;
  const price = Number(priceElem.value);
  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }

  console.log(createdCourse);
});
