var nameVar = "Andrew";
var nameVar = "Mike";
console.log("nameVar", nameVar);

let nameLet = "Jen";
// let nameLet = "Julie"; // Error!
nameLet = "Julie";
console.log("nameLet", nameLet);

const nameConst = "Frank";
// const nameConst = "Gunther"; // Error!
// nameConst = "Sonya"; // Error!
console.log("nameConst", nameConst);

// Block scoping

var fullName = "Jen Mead";

if (fullName) {
  let firstName = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];
  console.log(firstName);
  console.log(lastName);
}

// console.log(firstName); // Error!
// console.log(lastName); // Error!
