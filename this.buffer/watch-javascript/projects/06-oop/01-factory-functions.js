// const elf = {
//   name: "Orwell",
//   weapon: "bow",
//   attack() {
//     return "attack with " + elf.weapon;
//   }
// };

// const elf2 = {
//   name: "Sally",
//   weapon: "bow",
//   attack() {
//     return "attack with " + elf.weapon;
//   }
// };

// Factory functions

function createElf(name, weapon) {
  return {
    name,
    weapon,
    attack() {
      return "attack with " + this.weapon;
    }
  };
}

const peter = createElf("Peter", "stones");
const sam = createElf("Sam", "fire");
