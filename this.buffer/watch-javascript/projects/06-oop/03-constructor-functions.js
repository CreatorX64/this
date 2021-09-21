// const Elf1 = new Function(
//   "name",
//   "weapon",
//   `this.name = name; this.weapon = weapon;`
// );
// const sarah = new Elf1("Sarah", "fireworks");

function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

Elf.prototype.attack = function () {
  return `attack with ${this.weapon}`;
};

Elf.prototype.build = function () {
  function building() {
    return `${this.name} builds a house`;
  }

  // return building(); // "undefined builds a house"
  return building.call(this);
};

const peter = new Elf("Peter", "stones");
const sam = new Elf("Sam", "fire");
