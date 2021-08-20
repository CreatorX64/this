// console.log(this);  // Prints Window object

// function a() {
//   console.log(this);
//   // We can create a variable on the global object (bad idea)
//   this.newVariable = "hello";
// }

// var b = function () {
//   console.log(this);
// };

// When you're just invoking the function, "this" inside the function points
// to the global variable
// a();  // Prints the Window object
// b();  // Prints the Window object
// console.log(newVariable);

// In the case where a function is actually a method attached to an object,
// "this" becomes the object that method is sitting inside of
var c = {
  name: "The c object",
  log: function () {
    // this.name = "Updated c object";
    // console.log(this);
    // var setName = function (newName) {
    //   this.name = newName;  // "this" is the global Window object in here!
    // };
    // setName("Updated again! The c object");
    // console.log(this);

    // To solve the problem that "this" is the global object inside
    // the setName function
    var self = this;
    self.name = "Updated c object";
    console.log(self);
    var setName = function (newName) {
      self.name = newName;
    };
    setName("Updated again! The c object");
    console.log(self);
  },
  test: function() {
    console.log(this);
  }
};

c.log();

// Inside a function, the value of "this" depends on how the function is called
var test2 = c.test;
c.test();  // Prints c object
test2();  // Prints Window object