// This achieves the same thing as below, but it is longer to write
// var person = new Object();
// person.firstName = "Tony";
// person.lastName = "Alicea";

var Tony = {
  firstName: "Tony",
  lastName: "Alicea",
  address: {
    street: "111 Main St.",
    city: "New York",
    state: "NY"
  }
};

function greet(person) {
  console.log("Hi " + person.firstName);
}

greet(Tony);

greet({
  firstName: "Mary",
  lastName: "Doe"
});

Tony.address2 = {
  street: "333 Second St."
};

// As can be seen above, we can use the object literal syntax when creating
// a brand new object, when passing an object to a function, or when updating
// another object's property using the member access operator. We can mix and
// match the object literal syntax with all of those because under the hood,
// the object literal syntax (or using the new Object() method) achieves the
// same thing: A space in memory is allocated for an object and memory
// locations of its properties/methods are given to it