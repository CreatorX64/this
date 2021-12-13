import "../src/db/mongoose.js";
import User from "../src/models/User.js";

// Using Promise API

// User.findByIdAndUpdate("61b24179a9361438ae6ddcb3", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Using async/await

async function updateAgeAndGetCount(id, age) {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
}

updateAgeAndGetCount("61b24179a9361438ae6ddcb3", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.error(error);
  });
