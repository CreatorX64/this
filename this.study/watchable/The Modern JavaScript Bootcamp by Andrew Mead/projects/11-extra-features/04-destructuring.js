// Object destructuring.

const todo =
{
  id: "lsşakdfjsdlkjflkdsj",
  text: "Pay the bills",
  completed: false
};

// const text = todo.text;
// const completed = todo.completed;

// const { text, completed } = todo;
// const { text:todoText, completed } = todo;
// const { text:todoText, completed, details = "No details provided" } = todo;
// const { text:todoText, completed, details:otherDetails = "No details provided" } = todo;
const { text:todoText, completed, details = "No details provided", ...others } = todo;

// console.log(text);
// console.log(todoText);
// console.log(completed);
// console.log(details);
// console.log(others);

const printTodo = ({text, completed}) =>
{
  console.log(`${text}: ${completed}`);
};

// printTodo(todo);

// Array destructuring.

// const age = [65, 0, 13, 21];
const age = [65, 0, 13];

// const [firstAge, secondAge] = age;
// const [firstAge, secondAge, , lastAge] = age;
// const [firstAge, secondAge, , lastAge = 123] = age;
const [firstAge, ...otherAges] = age;

// console.log(firstAge);
// console.log(secondAge);
// console.log(lastAge);
// console.log(otherAges);