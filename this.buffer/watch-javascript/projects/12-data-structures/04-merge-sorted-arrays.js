function mergeSortedArraysMySolutionShort(array1, array2) {
  if (!(array1 instanceof Array) || !(array2 instanceof Array)) {
    throw new TypeError("Arguments must be of type Array");
  }
  const mergedArray = [...array1, ...array2];
  mergedArray.sort((a, b) => (a < b ? -1 : 1));
  return mergedArray;
}

function mergeSortedArraysMySolution(array1, array2) {
  if (!(array1 instanceof Array) || !(array2 instanceof Array)) {
    throw new TypeError("Arguments must be of type Array");
  }

  let mergedArray = [];
  let array1Index = 0;
  let array2Index = 0;

  for (let i = 0; i < array1.length + array2.length; i++) {
    let nextItem;

    // One of the arrays ran out of items, or was empty at the beginning.
    if (array1Index >= array1.length) {
      mergedArray = mergedArray.concat(array2.slice(array2Index));
      break;
    } else if (array2Index >= array2.length) {
      mergedArray = mergedArray.concat(array1.slice(array1Index));
      break;
    }

    if (array1[array1Index] < array2[array2Index]) {
      nextItem = array1[array1Index];
      array1Index++;
    } else {
      nextItem = array2[array2Index];
      array2Index++;
    }

    mergedArray[i] = nextItem;
  }

  return mergedArray;
}

function mergeSortedArrays(array1, array2) {
  const mergedArray = [];
  let array1Item = array1[0];
  let array2Item = array2[0];
  let i = 1;
  let j = 1;

  if (array1.length === 0) {
    return array2;
  }
  if (array2.length === 0) {
    return array1;
  }

  while (array1Item || array2Item) {
    if (!array2Item || array1Item < array2Item) {
      mergedArray.push(array1Item);
      array1Item = array1[i];
      i++;
    } else {
      mergedArray.push(array2Item);
      array2Item = array2[j];
      j++;
    }
  }

  return mergedArray;
}

// const result = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
// const result = mergeSortedArrays([0, 3, 4, 31], []);

// const result = mergeSortedArraysMySolution([0, 3, 4, 31], [4, 6, 30]);
// const result = mergeSortedArraysMySolution([0, 3, 4, 31], []);
// const result = mergeSortedArraysMySolution([0, 3, 4, 31], "asdf");

console.dir(result);
