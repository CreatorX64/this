var person = new Object();

// Creating a property using the "computed member access operator". After this
// operation, a spot of memory is created for the "firstName" property and and
// the "person" object gets a reference to the address of the location of that
// memory. This operator is left associative
person["firstName"] = "Tony";
person["lastName"] = "Alicea";

var firstNameProperty = "firstName";

console.log(person);
console.log(person[firstNameProperty]);

// Using the "member access operator". This operator is left associative
console.log(person.firstName);
console.log(person.lastName);

person.address = new Object();
person.address.street = "111 Main St.";
person.address.city = "New York";
person.address.state = "NY";

console.log(person.address.street);
console.log(person.address.city);
console.log(person["address"]["state"]);