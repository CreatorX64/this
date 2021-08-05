import uuidv4 from "uuid/v4";

// Setup the empty todos array
let todos = [];

// Save todos to Local Storage.
const saveTodos = () =>
{
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Load todos from Local Storage.
const loadTodos = () =>
{
  const todosJSON = localStorage.getItem("todos");

  try
  {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  }
  catch (e)
  {
    todos = [];
  }
};

// Expose todos to outside modules.
const getTodos = () => todos;

// Create a new todo and save.
const createTodo = text =>
{
  todos.push(
    {
      id: uuidv4(),
      text,
      completed: false
    }
  );
  saveTodos();
};

// Remove a todo and save.
const removeTodo = id =>
{
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex > -1)
  {
    todos.splice(todoIndex, 1);
    saveTodos();
  }
};

// Toggle completed value for a todo.
const toggleTodo = id =>
{
  const todo = todos.find(todo => todo.id === id);

  if (todo !== undefined)
  {
    todo.completed = !todo.completed;
    saveTodos();
  }
};

loadTodos();

export {
  loadTodos,
  getTodos,
  createTodo,
  removeTodo,
  toggleTodo
};