// Big initializations like below can seem complicated for beginners. But they
// are very useful to define perhaps some amount of dummy data while you're
// developing your app's frontend, after which you would get this data from a
// Web API.

var people = [
  {
    // The "John" Doe
    firstName: "John",
    lastName: "Doe",
    addresses: ["111 Main St.", "222 Third St."]
  },
  {
    // The "Jane" object
    firstName: "Jane",
    lastName: "Doe",
    addresses: ["333 Main St.", "444 Third St."],
    greet: function () {
      return "Hello!";
    }
  }
];

console.log(people);
