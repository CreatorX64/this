import { Todo } from "../models/Todo";
import "../styles/TodoList.css";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (todoId: string) => void;
}

export function TodoList(props: TodoListProps) {
  return (
    <ul>
      {props.todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={props.onDeleteTodo.bind(null, todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
