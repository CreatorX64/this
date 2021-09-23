import React, { useEffect, useReducer } from "react";
import { NotesContext } from "../context/NotesContext";
import { notesReducer } from "../reducers/notes";
import { AddNoteForm } from "./AddNoteForm";
import { NoteList } from "./NoteList";

export function NoteApp() {
  const [notes, notesDispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem("notes"));
    if (notesData) {
      notesDispatch({ type: "POPULATE_NOTES", notes: notesData });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, dispatch: notesDispatch }}>
      <h1>Notes</h1>
      <NoteList />
      <AddNoteForm />
    </NotesContext.Provider>
  );
}
