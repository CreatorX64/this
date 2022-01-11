export class TodoItem {
  // Receive parameters and use them to create instance properties in a single
  // step, avoiding the error-prone process of defining a property and explicitly
  // assigning it the value received by a parameter.
  constructor(
    public id: number,
    public task: string,
    public complete: boolean = false
  ) {}

  // TypeScript assumes that all methods and properties are public unless
  // another access level is used. The public keyword is still used in the
  // constructor because that’s how the TypeScript compiler recognizes that
  // the concise constructor syntax is being used.
  printDetails(): void {
    console.log(
      `${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`
    );
  }
}

// The class below is written to emphasize similarity between TypeScript and
// languages such as C# and Java, but this isn't the way that TypeScript
// classes are usually defined. This class can be defined more concisely using
// TypeScript features as above.
// export class TodoItem {
//   public id: number;
//   public task: string;
//   public complete: boolean = false;

//   public constructor(id: number, task: string, complete: boolean = false) {
//     this.id = id;
//     this.task = task;
//     this.complete = complete;
//   }

//   public printDetails(): void {
//     console.log(
//       `${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`
//     );
//   }
// }
