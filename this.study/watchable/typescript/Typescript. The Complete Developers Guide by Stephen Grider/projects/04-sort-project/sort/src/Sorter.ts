export abstract class Sorter {
  abstract length: number;
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;

  sort(): void {
    const { length } = this;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}

// We use "type guards" any time we want to restore access to a set of
// properties in a union type.

// Below is an example of a "type guard" using "instanceof" oeprator.
// The "instanceof" operator checks to see whether the left operand
// (the object) has a reference to the right operand's (the constructor
// function's) "prototype" property anywhere in its prototypal chain.
// We use the instanceof operator to figure out the type of a
// non-primitive value like an Array instance (basically every other
// value that's created with a constructor function).

// if (this.collection instanceof Array) { }

// Below is an example of a "type guard" using the "typeof" operator.
// We use the typeof operator to figure out the type of a primitive
// value like a number, string, or boolean.

// if (typeof this.collection === "string") { }
