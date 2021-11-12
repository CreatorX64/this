interface Named {
  // name: string;
  readonly name?: string;
  outputName?: string;
  runRunRun?(speed: number): void;
}

// Can extend more than one interface.
interface Greetable extends Named {
  greet(phrase: string): void;
}

// Can implement more than one interface.
class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  greet(phrase: string): void {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("hi");
    }
  }
}

// let user1: Person;
let user1: Greetable;

// user1 = {
//   name: "Max",
//   age: 30,
//   greet(phrase: string): void {
//     console.log(phrase + " " + this.name);
//   }
// };
user1 = new Person();

// user1.name = "John"; // Error, readonly field

user1.greet("Hi there, I am");

console.log(user1);

// Differences between "type" and "interface" keywords is that type can be
// used to alias unions, whereas interface cannot. So "type" seems more
// flexible, but "interface" is more clearer because it's main job is to
// define the structure of an object. In addition, interfaces can be
// implemented by classes just like in other OOP languages. types can
// also be used to do that, but since interfaces are used in other
// languages, "interface" keywords feels more intuitive.

// In this case though, using "type" is more common because we're essentially
// not defining the structure of an object.
type AddFn = (a: number, b: number) => number;

// interface AddFn {
//   (a: number, b: number): number;
// }

let add: AddFn = (n1: number, n2: number): number => {
  return n1 + n2;
};
