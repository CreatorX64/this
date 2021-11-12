// const person: { name: string; age: number } = {
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "Maximilian",
//   age: 30,
//   hobbies: ["Sports", "Cooking"],
//   role: [2, "author"]
// };

// enum Role {
//   ADMIN, // 0
//   READ_ONLY, // 1
//   AUTHOR // 2
// }
// enum Role {
//   ADMIN = 5, // 5
//   READ_ONLY, // 6
//   AUTHOR // 7
// }
enum Role {
  ADMIN = "ADMIN",
  READ_ONLY = 100,
  AUTHOR // 101
}

const person = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN
};

// person.role[1] = 10; // Error!
// person.role = [0, "admin", "role"]; // Error!
// person.role.push("admin"); // No error! push() is an exception on tuples, can't be detected.

// let favActivities: any[];
let favActivities: string[];
// favActivities = "Sports"; // Error!
// favActivities = ["Sports", 2]; // Error!
favActivities = ["Sports"];

console.log(person);
console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.role === Role.AUTHOR) {
  console.log("Is read only!");
}
