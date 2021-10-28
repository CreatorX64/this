import { v4 as uuid } from "uuid";
import useLocalStorageState from "./useLocalStorageState";

export default function useTodoState(initialTodos) {
  const [todos, setTodos] = useLocalStorageState("todos", initialTodos);

  function addTodo(newTodoText) {
    setTodos([...todos, { id: uuid(), task: newTodoText, completed: false }]);
  }

  function removeTodo(todoId) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  function toggleTodo(todoId) {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function editTodo(todoId, newTask) {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, task: newTask } : todo
      )
    );
  }

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo
  };
}
