import { FC, ChangeEvent, useState } from "react";
import { ITodo } from "./interfaces/ITodo";
import { TodoTask } from "./components/TodoTask";
import "./App.css";

export const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else if (event.target.name === "deadline") {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { task, deadline };
    setTodoList((prevState) => [...prevState, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTodo = (taskNameToDelete: string): void => {
    setTodoList((prevState) =>
      prevState.filter((todo) => todo.task !== taskNameToDelete)
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="input-container">
          <input
            type="text"
            name="task"
            placeholder="Task..."
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            name="deadline"
            placeholder="Deadline (in days)"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add task</button>
      </div>
      <div className="todo-list">
        {todoList.map((todo: ITodo, key: number) => (
          <TodoTask key={key} todo={todo} completeTodo={completeTodo} />
        ))}
      </div>
    </div>
  );
};
