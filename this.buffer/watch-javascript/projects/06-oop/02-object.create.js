const elfFunctions = {
  attack() {
    return "attack with " + this.weapon;
  }
};

function createElf(name, weapon) {
  const newElf = Object.create(elfFunctions);
  newElf.name = name;
  newElf.weapon = weapon;
  return newElf;
}

const peter = createElf("Peter", "stones");
const sam = createElf("Sam", "fire");

// peter.attack = elfFunctions.attack;
// sam.attack = elfFunctions.attack;
