var person = {
  firstName: "Default",
  lastName: "Default",
  getFullName: function () {
    return this.firstName + " " + this.lastName;
  }
};

var john = {
  firstName: "John",
  lastName: "Doe"
};
Object.setPrototypeOf(john, person);

// for ... in will loop through each property in the object and it's prototypal
// chain (until and not including Object.prototype) and it will assign the property
// name to the variable in the loop header
for (var prop in john) {
  // We can check whether an object has a property in itself and not not in its
  // prototypal chain by using the Object.prototype.hasOwnProperty method
  if (john.hasOwnProperty(prop)) {
    console.log(prop + ": " + john[prop]);
  }
}

// The reflection capabilities provided by the JavaScript language pave way
// for an idea that's not built into the language but is very powerful and
// useful. This is the "extend" concept which is avaiable in many frameworks
// and libraries, sometimes under a different name. Note that in modern
// JavaScript there's also the keyword "extends". That serves a different
// purpose: It is used to set the prototype

var jane = {
  address: "111 Main St.",
  getFormalFullName: function () {
    return this.lastName + ", " + this.firstName;
  }
};

var jim = {
  getFirstName: function () {
    return this.firstName;
  }
};

// The "extend" function of the underscore library takes the first argument
// object, and copies all properties and methods from the remaining argument
// objects to the first object. Internally, it uses reflection capabilities
// of the JavaScript language to achieve this (it actually uses for...in
// to achieve it)
_.extend(john, jane, jim);
console.dir(john);

// The key takeaway is that you can use reflection to also have this "extend"
// pattern, not just the prototype pattern, to combine and compose objects