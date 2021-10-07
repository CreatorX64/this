// Time complexity: O(n)
function getFirstRecurringItem(array) {
  const existenceMap = {};
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (existenceMap[item]) {
      return item;
    }
    existenceMap[item] = true;
  }
  return null;
}

// Should print: 2
console.log(getFirstRecurringItem([2, 5, 1, 2, 3, 5, 1, 2, 4]));

// Should print: 1
console.log(getFirstRecurringItem([2, 1, 1, 2, 3, 5, 1, 2, 4]));

// Should print: null
console.log(getFirstRecurringItem([2, 3, 4, 5]));
