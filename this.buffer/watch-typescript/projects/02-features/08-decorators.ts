@classDecorator
class Boat {
  @testDecorator
  color: string = "red";

  @testDecorator
  get formattedColor(): string {
    return `This boat's color is ${this.color}`;
  }

  @logError("Oops! Boat was sunk in ocean.")
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    // throw new Error();
    if (speed === "fast") {
      console.log("swish");
    } else {
      console.log("nothing");
    }
  }
}

// Method Decorator
// Target: Boat.prototype
// Key: pilot
// desc: Property descriptor of the method on which the decorator was placed, which includes a reference to the method itself.
// function logError(target: any, key: string, desc: PropertyDescriptor): void {
//   const method = desc.value;
//   desc.value = function () {
//     try {
//       method();
//     } catch (err) {
//       console.log("Oops! Boat was sunk in ocean.");
//     }
//   };
// }

// Method Decorator
// Decorator Factory
function logError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
    desc.value = function () {
      try {
        method();
      } catch (err) {
        console.log(errorMessage);
      }
    };
  };
}

// new Boat().pilot();

// Property Decorator
// We cannot read instance properties using a decorator (it's not impossible,
// but it's not available as a suggested thing to do, because remember, decorators
// are only run once when the class is loaded, so there wouldn't be any sense of
// accessing instance properties from within a decorator because there wouldn't
// be any instances when the decorator is run). The only information
// we can have about a property in a decorator is that property's key whcih is
// passed in as the "key" argument to the decorator function.
function testDecorator(target: any, key: string): void {
  console.log(target);
  console.log(key);
}

// Parameter Decorator
function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

// Class Decorator
function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

// When our code is transpiled, a __decorate function is created (you can
// actually copy-paste this code to the TypeScript playground and check for
// yourself if you don't remember). When we remove some unrelated error-checking
// fluff out of that function, we're essentailly left with the following function:
// var __decorate = function (decorators, target, key, desc) {
//   var desc = Object.getOwnPropertyDescriptor(target, key);
//   for (var decorator of decorators) {
//     decorator(target, key, desc);
//   }
// }

// In effect, decorators are just syntactic sugar. We can easily achieve the same
// functionality with the following code, though note that in a project that must use
// many decorators, the code will get real busy real fast if we don't have the sugar.
// testDecorator(Boat.prototype, "pilot");

// Property Descriptors
// const car = { make: "honda", year: 2000 };
// console.log(Object.getOwnPropertyDescriptor(car, "make"));
// Object.defineProperty(car, "make", { writable: false });
// console.log(Object.getOwnPropertyDescriptor(car, "make"));
// car.make = "chevy";
// console.log(car.make); // Error! (In pure JS, this would not throw Error but the assignment would silently abort)

// We can use decorators on static methods, accessors, and properties as well.
