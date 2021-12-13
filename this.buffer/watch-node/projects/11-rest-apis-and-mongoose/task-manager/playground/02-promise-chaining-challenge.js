import "../src/db/mongoose.js";
import Task from "../src/models/Task.js";

// Using Promise API

// Task.findByIdAndDelete("61b7b0c715d75b91486d919d")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Using async/await

async function deleteTaskAndGetCount(id) {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
}

deleteTaskAndGetCount("61b2468c0ea9c0f9547c05a8")
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.error(error);
  });
