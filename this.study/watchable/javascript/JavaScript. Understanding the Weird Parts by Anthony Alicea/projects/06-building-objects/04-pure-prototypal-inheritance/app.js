// We've seen that function constructors were designed to mimic other languages
// that don't implement prototypal inheritance, so they're a little awkward. Other
// langs implement something called "classes" where a class defines what an object
// should look like, and then you use the "new" keyword to create the object.
// That's what function constructors in JavaScript are trying to mimic.

// Many consider it better to simply focus on the fact that JavaScript does use
// prototypal inheritance and not classical inheritance. So another way to create
// objects that doesn't try to mimic other programming languages is done using
// Object.create (which all modern browsers implement).

var person = {
  firstName: "Default",
  lastName: "Default",
  greet: function () {
    // As a reminder: If we don't use "this" to access the "firstName" property, the
    // "firstName" variable will be searched in the execution context created by
    // the function, then after it's not found it will be searched in the global
    // execution context where it doesn't exist either.
    return "Hi " + this.firstName;
  }
};

// Object.create() creates an empty object with its prototype pointing at
// whatever you passed in as an argument.
var john = Object.create(person);
console.dir(john);

// You can override stuff that's on the prototype by adding properties
// and methods to the object, thanks to how a property is searched in
// the prototypal chain (first the object is searched, then its prototype).
john.firstName = "John";
john.lastName = "Doe"

console.log(john.greet());

// This is pure prototypal inheritance. It drives some people crazy because it
// is so simple. It's not verbose, it's very straightforward, and very powerful
// because you can mutate the prototype along the way. It's not trying to squeeze
// in any other concepts from other programming languages. It's just: Create an
// object, and then use that object as the prototype for other objects. This
// opens a freer approach to constructing objects. You're not unnecessarily
// creating complex layers and interactions.

// We said that Object.create was implemented by the JavaScript engine in
// modern browsers. What if you're working on a legacy project? You can use
// what's called a "polyfill".

// Below is an example of a polyfill for Object.create():
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error("Object.create implementation only accepts the first parameter.");
    }
    function F () {}
    F.prototype = o;
    return new F();
  };
}