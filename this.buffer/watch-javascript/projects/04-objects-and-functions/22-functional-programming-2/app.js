var arr = [1, 2, 3];

var arr1 = _.map(arr, function (item) { return item * 3; });
console.log(arr1);

var arr2 = _.filter([2, 3, 4, 5, 6, 7], function (item) { return item % 2 === 0; });
console.log(arr2);