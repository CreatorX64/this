// ES6 has a new concept, but it's just another way to create objects and
// set the prototype just like we did with funcation constructors, or
// Object.create(). It is what's called a "syntactic sugar". This is the
// concept of "classes". Classes in other programming languages are very
// popular: They're a way of defining an object, defining what it's methods
// and properties should be. JavaScript has classes, but in a different way.

// A JavaScript class defines an object. There is a constructor() that acts
// somewhat like the constructor functions that we've seen in that you can preset
// the object's values

// The difference is that in other programming languages, a class is not
// an object, it's just a definition, like a template, that tells you what
// objects should look like. But you don't get an object untile you use the
// "new" keyword. But even though JavaScript has that "class" keyword, it
// still doesn't have classes in that sense. Because in the code below, the
// Person class that's created is an object, and then you create new objects
// from that Person object.

// However, once you know what's happening under the hood and appreciate the
// different aspects of JavaScript rather than trying to use classes like they
// exists in other languages like C# or Java (which you shouldn't do), the class
// keywords does have some benefits. For instance, the engine warns you when you
// don't use the "new" keyword when calling the constructor function (that's
// defined in a class).

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greet() {
    return "Hi " + this.firstName;
  }
}

var john = new Person("John", "Doe");
console.log(john.greet());

// Using classes in JavaScript, we can achieve prototypal inheritance using
// the "extends" keyword. In the below case, the "extends" keyword will
// effectively point the prototype of InformalPerson.prototype to the
// Person.prototype. So when we create an object, it will have the following
// prototype tree:

// jane
//   |
//   [[Prototype]]  =>  InformalPerson.prototype
//                                         |
//                                         [[Prototype]]  =>  Person.prototype                        

class InformalPerson extends Person {
  constructor(firstName, lastName) {
    // super() will call the constructor of the object that provides its
    // "prototype" property as a reference to the InformalPerson.prototype
    // object's prototype
    super(firstName, lastName);
  }

  greet() {
    return "Yo " + this.firstName;
  }
}

var jane = new InformalPerson("Jane", "Doe");
console.dir(jane);
console.log(jane.greet());