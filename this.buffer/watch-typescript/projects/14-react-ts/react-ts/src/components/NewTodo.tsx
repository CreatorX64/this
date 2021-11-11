import React, { useRef } from "react";
import "../styles/NewTodo.css";

interface NewTodoProps {
  onAddTodo: (text: string) => void;
}

export function NewTodo(props: NewTodoProps) {
  function submitHandler(event: React.FormEvent): void {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
    textInputRef.current!.value = "";
  }

  const textInputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">Add todo</button>
    </form>
  );
}
