import React, { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import { useMousePosition } from "../hooks/useMousePosition";

export function AddNoteForm() {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const position = useMousePosition();

  function addNote(e) {
    e.preventDefault();
    dispatch({ type: "ADD_NOTE", title, body });
    setTitle("");
    setBody("");
  }

  return (
    // or <>
    <React.Fragment>
      <p>
        Add note: {position.x} - {position.y}
      </p>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button>Add</button>
      </form>
    </React.Fragment>
    // or </>
  );
}
