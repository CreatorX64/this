const obj = { name: "Andrei" };

function clone(obj) {
  return { ...obj };
}

// This might seem inefficient as we copy a whole object just to change a
// property on it, but it's not as bad as it first looks thanks to the concept
// of "structural sharing". Many libraries which make use of functional
// programming implement structural sharing. Structural sharing provides an
// efficient way to share data between multiple versions of it, instead of
// copying the whole data. It's kind of similar to the way git manages multiple
// versions of your source code: git doesn't copy all the files on each commit.
function updateName(obj) {
  const obj2 = clone(obj);
  obj2.name = "Nana";
  return obj2;
}

const updatedObj = updateName(obj);
console.log(updatedObj);
