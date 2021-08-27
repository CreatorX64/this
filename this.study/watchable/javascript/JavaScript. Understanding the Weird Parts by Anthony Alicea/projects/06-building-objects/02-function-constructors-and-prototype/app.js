// Remember, JavaScript functions are objects. They have some properties like
// "name" (optional, can be anonymous), a special "code" property that holds the
// code that gets executed when you invoke it ("Invocable"). In addition to those,
// ALL functions in JavaScript have a property called "prototype" which starts
// off as an empty object and unless you're using the function as a function
// constructor, the "prototype" property is never used. But as soon as you use
// the "new" operator to invoke your function, the "prototype" property comes
// into play

// The "prototype" property of a function object is NOT the prototype of the
// function object, it's the prototype of any objects created using that function
// as a function constructor with the "new" keyword

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  // this.getFullName = function () {
  //   return this.firstName + " " + this.lastName;
  // };
}

Person.prototype.getFullName = function () {
  return this.firstName + " " + this.lastName;
};

var john = new Person("John", "Doe");
console.log(john);
console.log(john.getFullName());

var jane = new Person("Jane", "Doe");
console.log(jane);
console.log(jane.getFullName());

// We can add properties/methods to the prototype after we create the objects,
// and our objects can see the updates! This is because of the fact that our
// object's prototype has a reference to the constructor's "prototype" property,
// it is not a copy of it. In other words, we can use the "prototype" property
// of a constructor function to add features to all the objects created with it
Person.prototype.getFormalFullName = function () {
  return this.lastName + ", " + this.firstName;
};
console.log(john.getFormalFullName());

// Often in good JavaScript code you'll see that properties are set up inside
// the function constructor, but methods sit on the prototype. The properties are
// set in the constructor function because they have different values for each object,
// so we need different memory spaces to hold them. You could also put the methods
// in the constructor but here's the problem: Functions in JavaScript are objects,
// they take up memory space, anything you add to them takes up memory space, so if
// we place the method definition inside the constructor we would effectively create
// a copy of that method for each object created using that constructor function.
// That is not ideal, and that's why we define the method on the constructor
// function's "prototype" property, to save memory space, we only need one copy of it