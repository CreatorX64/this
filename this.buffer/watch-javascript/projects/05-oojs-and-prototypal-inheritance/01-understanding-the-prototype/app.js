var person = {
  firstName: "Default",
  lastName: "Default",
  getFullName: function () {
    return this.firstName + " " + this.lastName;
  }
};

var john = {
  firstName: "John",  // This hides the "firstName" on the prototype
  lastName: "Doe"  // This hides the "lastName" on the prototype
};

// Don't do this ever! It can cause performance issues. For demo purposes only
john.__proto__ = person;
// Instead, if you want to create an object using another object as its prototype, you can use the following method
var myObj = Object.create(person);
console.log(Object.getPrototypeOf(myObj) === person);  // true

// When the getFullName function is invoked, the execution context that gets
// created knows what object originally we invoked the function on. So inside
// the execution context, "this" binding points to the "john" object and not
// the "person" object
console.log(john.getFullName());

console.log(john.firstName);

var jane = {
  firstName: "Jane"
};
jane.__proto__ = person;
console.log(jane.getFullName());  // "Jane Default"