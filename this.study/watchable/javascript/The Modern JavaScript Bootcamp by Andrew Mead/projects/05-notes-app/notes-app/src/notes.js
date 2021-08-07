import uuidv4 from "uuid/v4";
import moment from "moment";

let notes = [];

// Read existing notes from Local Storage.
const loadNotes = () =>
{
  const notesJSON = localStorage.getItem("notes");

  try
  {
    notes = notesJSON ? JSON.parse(notesJSON) : [];
  }
  catch (e)
  {
    notes = [];
  }
};

// Save the notes to Local Storage.
const saveNotes = () =>
{
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Expose notes from current module.
const getNotes = () => notes;

// Create a new note and add it to notes array.
const createNote = () =>
{
  const id = uuidv4();
  const timestamp = moment().valueOf();

  notes.push(
    {
      id: id,
      title: "",
      body: "",
      createdAt: timestamp,
      updatedAt: timestamp
    }
  );
  saveNotes();
  
  return id;
};

// Remove note from the list.
const removeNote = id =>
{
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex > -1)
  {
    notes.splice(noteIndex, 1);
    saveNotes();
  }
};

// Sort notes by one of three ways.
const sortNotes = sortBy =>
{
  if (sortBy === "byEdited")
  {
    return notes.sort((a, b) =>
    {
      if (a.updatedAt > b.updatedAt)
      {
        return -1;
      }
      else if (a.updatedAt < b.updatedAt)
      {
        return 1;
      }
      else
      {
        return 0;
      }
    });
  }
  else if (sortBy === "byCreated")
  {
    return notes.sort((a, b) =>
    {
      if (a.createdAt > b.createdAt)
      {
        return -1;
      }
      else if (a.createdAt < b.createdAt)
      {
        return 1;
      }
      else
      {
        return 0;
      }
    });
  }
  else if (sortBy === "alphabetical")
  {
    return notes.sort((a, b) =>
    {
      if (a.title.toLowerCase() < b.title.toLowerCase())
      {
        return -1;
      }
      else if (a.title.toLowerCase() > b.title.toLowerCase())
      {
        return 1;
      }
      else
      {
        return 0;
      }
    })
  }
  else
  {
    return notes;
  }
};

// Find a note by id and update.
const updateNote = (id, updates) =>
{
  const note = notes.find(note => note.id === id);

  if (note === undefined)
  {
    return;
  }

  if (typeof updates.title === "string")
  {
    note.title = updates.title;
    note.updatedAt = moment().valueOf();
  }

  if (typeof updates.body === "string")
  {
    note.body = updates.body;
    note.updatedAt = moment().valueOf();
  }

  saveNotes();

  return note;
};

loadNotes();

export {
  loadNotes,
  getNotes,
  createNote,
  removeNote,
  sortNotes,
  updateNote
};