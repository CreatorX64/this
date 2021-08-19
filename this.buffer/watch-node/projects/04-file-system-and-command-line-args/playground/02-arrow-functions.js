// function square(x) {
//   return x * x;
// }

// const square = (x) => {
//   return x * x;
// };

// const square = (x) => x * x;

// console.log(square(2));

const event = {
  name: "Birthday Party",
  guestList: ["Andrew", "Jen", "Mike"],
  // printGuestList: function () {
  //   console.log("Guest list for " + this.name);
  // }
  // printGuestList: () => {  // Error! No this binding in arrow functions
  //   console.log("Guest list for " + this.name);
  // }
  printGuestList() {
    console.log("Guest list for " + this.name);
    // this.guestList.forEach(function (guest) {  // Error! "this" binding is changed in inner function
    //   console.log(guest + " is attending " + this.name);
    // });
    this.guestList.forEach((guest) => {
      console.log("  " + guest + " is attending " + this.name);
    });
  }
};

event.printGuestList();