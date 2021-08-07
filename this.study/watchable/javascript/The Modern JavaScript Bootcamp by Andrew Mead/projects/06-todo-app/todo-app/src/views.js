import { getTodos, toggleTodo, removeTodo } from "./todos";
import { getFilters } from "./filters";

// Render application todos based on filters.
const renderTodos = () =>
{
  const todosElem = document.querySelector("#todos");

  const todos = getTodos();
  const { searchText, hideCompleted } = getFilters();
  const filteredTodos = todos.filter(todo =>
  {
    const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;
    
    return searchTextMatch && hideCompletedMatch;
  });
  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  todosElem.innerHTML = "";
  todosElem.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0)
  {
    filteredTodos.forEach(todo =>
    {
      todosElem.appendChild(generateTodoDOM(todo));
    });
  }
  else
  {
    const messageElem = document.createElement("p");
    messageElem.classList.add("empty-message");
    messageElem.textContent = "There are no todos to show.";
    todosElem.appendChild(messageElem);
  }
};

// Generate DOM element for individual todo.
const generateTodoDOM = todo =>
{
  const containerElem = document.createElement("div");
  const todoElem = document.createElement("label");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Setup the todo checkbox.
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () =>
  {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Setup the todo text.
  todoText.textContent = todo.text;

  // Setup the remove button.
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  removeButton.addEventListener("click", () =>
  {
    removeTodo(todo.id);
    renderTodos();
  });

  // Setup container.
  todoElem.classList.add("list-item");
  containerElem.classList.add("list-item__container")

  // Add all emenets to the todo container.
  containerElem.appendChild(checkbox);
  containerElem.appendChild(todoText);
  todoElem.appendChild(containerElem);
  todoElem.appendChild(removeButton);
  
  return todoElem;
};

// Generate DOM element for todo summary.
const generateSummaryDOM = incompleteTodos =>
{
  const summary = document.createElement("h2");
  const plural = incompleteTodos.length === 1 ? "" : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left.`;
  return summary;
};

export {
  renderTodos,
  generateTodoDOM,
  generateSummaryDOM
};