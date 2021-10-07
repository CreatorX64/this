// In JavaScript private fields/methods are not possible, hence it is a
// common practice to prepend fields that are intended to be private by
// the "_" character. In practice, it is possible to achieve true private
// methods/fields but it requires hacky solutions using closures or symbols.
// This is much simpler and cleaner.

class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  // O(1)
  _hash(key) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }

    return hash;
  }

  // O(1)
  set(key, value) {
    const address = this._hash(key);

    if (!this.data[address]) {
      this.data[address] = [];
    }

    this.data[address].push([key, value]);
  }

  // O(1)
  get(key) {
    const address = this._hash(key);
    const bucket = this.data[address];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1];
        }
      }
    }

    return null;
  }

  keys() {
    const keys = [];

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        for (let j = 0; j < this.data[i].length; j++) {
          if (this.data[i][j]) {
            keys.push(this.data[i][j][0]);
          }
        }
      }
    }

    return keys;
  }
}

const myHashTable = new HashTable(2);

myHashTable.set("grapes", 10000);
myHashTable.set("apples", 54);
myHashTable.set("pears", 49);
myHashTable.set("lemons", 80);

console.log(myHashTable.get("grapes"));
console.log(myHashTable.get("apples"));
console.log(myHashTable.get("thisdoesntexist"));

console.log(myHashTable.keys());
