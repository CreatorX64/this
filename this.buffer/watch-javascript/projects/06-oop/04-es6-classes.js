class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return `attack with ${this.weapon}`;
  }
}

const peter = new Elf("Peter", "stones");
const sam = new Elf("Sam", "fire");

// "this" can be determined in four differnet scenarios:
// 1) Inside constructor functions
// 2) Imlicit binding
// 3) Explicit binding (via call, apply, bind)
// 4) Arrow functions (lexical "this" binding)
