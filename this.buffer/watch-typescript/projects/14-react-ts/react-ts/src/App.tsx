import { useState } from "react";
import { TodoList } from "./components/TodoList";
import { NewTodo } from "./components/NewTodo";
import { Todo } from "./models/Todo";

export function App() {
  function todoAddHandler(text: string): void {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text }
    ]);
  }

  function todoDeleteHandler(todoId: string): void {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  }

  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList todos={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
}
