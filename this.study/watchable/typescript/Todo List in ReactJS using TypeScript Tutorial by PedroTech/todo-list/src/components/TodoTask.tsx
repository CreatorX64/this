import { ITodo } from "../interfaces/ITodo";

type Props = {
  todo: ITodo;
  completeTodo(taskNameToDelete: string): void;
};

export const TodoTask = ({ todo, completeTodo }: Props) => {
  return (
    <div className="todo">
      <div className="content">
        <span>{todo.task}</span>
        <span>{todo.deadline}</span>
      </div>
      <button onClick={() => completeTodo(todo.task)}>X</button>
    </div>
  );
};
