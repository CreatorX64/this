var a = new Number(3);

// "a" is not a primitive, it's an object becuase function constructors create
// an object. And all objects have a prototype. In this case, "a"s prototype
// points to the Number constructor function's "prototype" property
console.log(a);
console.log(Object.getPrototypeOf(a) === Number.prototype);  // true
console.log(a.toFixed(2));  // We can call a method defined in the prototype

var b = new String("John");
console.log(b);
console.log(Object.getPrototypeOf(b) === String.prototype);  // true
console.log(b.indexOf("o"));  // We can call a method defined in the prototype

// In both the above cases, the primitive value is boxed in the object 
// returned by the function constructor so that useful properties and methods
// can be accessed to work with that value

// In the below case, it seems like we're calling a method on a primitive
// value but in reality JavaScript engine sees that we want to access a method
// on a string primitive and wraps that string primitive with an object
// created with the String function constructor
console.log("John".length);  // new String("John").length

// We can add extra features to built-in function constructors in JavaScript
// or to function contructors in other frameworks/libraries

String.prototype.isLengthGreaterThan = function (limit) {
  return this.length > limit;
};
console.log("John".isLengthGreaterThan(3));  // Our extension works because the string primitive is automatically converted to an object

Number.prototype.isPositive = function () {
  return this > 0;
};
// console.log(3.isPositive());  // SyntaxError. JavaScript won't convert number primitives into objects like it does for strings
console.log(new Number(3).isPositive());

//-- Dangerous Aside: Built-In Function Constructors:

// In general, you shouldn't use the built-in function constructors to create
// primitives unless you have to, even though they are useful to add features
// in some cases. By using built-in function constructors for creating
// primitives, you aren't really creating primitives, so strange things can happen
// during comparison with operators and coercion. So it's better in general to not
// use built-in function constructors. Use literals, actual primitive values. If
// you absolutely have to use them, understand that any kind of comparison needs
// to be in the same type

var x = 3;
var y = new Number(3);
console.log(x == y);  // true, because == coerces operands
console.log(x === y);  // false, because "x" is primitive and "y" is an object

// We can use them for value conversion sometimes without the "new" operator
var z = Number("3");

//-- Dangerious Aside: Arrays and for...in:

// Arrays in JavaScript are a bit different than they are in other languages.
// When we reference the array indexes (0, 1, 2, ...) pointing at a particular item
// in the array, those indexes are actually property names (as in a name-value pair)
// which is why we can use brackets to grab their values. So when we loop across an
// array using for...in, it works as expected in that it loops through each name of
// a name-value pair in the array (names being indexes)

// In light of all of this, there would be a problem if someone in some library adds
// features to the Array.prototype and we try to loop through our array using for...in.
// The problem is that the added property would be iterated over with the rest of
// the items in the array when we use for...in

var arr = ["John", "Jane", "Jim"];

Array.prototype.myCustomFeature = "cool!";

console.dir(arr);

for (var prop in arr) {
  console.log(prop + ": " + arr[prop]);
}
console.log("");

// So instead of using for...in to loop through an array, use the classical for loop,
// or use the for...of syntax if you don't need to reference the indices of items

for (let i = 0; i < arr.length; i++)
{
  console.log(i + ": " + arr[i]);
}
console.log("");

for (let val of arr) {
  console.log(val);
}
console.log("");

// As an extra note, if you're writing some code to extend Arrays or other
// array-like types and you expect your users (and maybe yourself) to still use
// the for...in syntax, you can define properties on the Array.prototype and
// still make them non-enumerable using the Object.defineProperty method

Object.defineProperty(Array.prototype, "addFirstAndLast", {
  value: function () {
    return this[0] + this[this.length-1];
  },
  writable: false,
  enumerable: false
});

console.dir(arr);
console.log(arr.addFirstAndLast());
for (var prop in arr) {
  console.log(prop + ": " + arr[prop]);
}
console.log("");

// We have to think about all this because arrays are objects in JavaScript
// and their items are added properties