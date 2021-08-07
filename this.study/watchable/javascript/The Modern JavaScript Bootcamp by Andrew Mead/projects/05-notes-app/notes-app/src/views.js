import moment from "moment";
import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";

// Generate the DOM structure for a note.
const generateNoteDOM = note =>
{
  const noteElem = document.createElement("a");
  const textElem = document.createElement("p");
  const statusElem = document.createElement("p");

  // Setup the note title text.
  if (note.title.trim().length > 0)
  {
    textElem.textContent = note.title;
  }
  else
  {
    textElem.textContent = "Unnamed note";
  }
  textElem.classList.add("list-item__title")

  // Setup the link.
  noteElem.setAttribute("href", `/edit.html#${note.id}`);
  noteElem.classList.add("list-item");

  // Setup the status message.
  statusElem.textContent = generateLastEdited(note.updatedAt);
  statusElem.classList.add("list-item__subtitle");

  // Add all elements to the note container.
  noteElem.appendChild(textElem);
  noteElem.appendChild(statusElem);

  return noteElem;
};

// Render application notes.
const renderNotes = () =>
{
  const notesElem = document.querySelector("#notes");
  
  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

  notesElem.innerHTML = "";

  if (filteredNotes.length > 0)
  {
    filteredNotes.forEach(note =>
    {
      const noteElem = generateNoteDOM(note);
      notesElem.appendChild(noteElem);
    });
  }
  else
  {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show.";
    emptyMessage.classList.add("empty-message");
    notesElem.appendChild(emptyMessage);
  }
};

// Initialize edit page.
const initializeEditPage = noteId =>
{
  const titleElement = document.querySelector("#note-title");
  const bodyElement = document.querySelector("#note-body");
  const dateElement = document.querySelector("#last-edited");

  const notes = getNotes();
  const note = notes.find(note => note.id === noteId);

  if (!note)
  {
    location.assign("/index.html");
  }

  titleElement.value = note.title;
  bodyElement.value = note.body;
  dateElement.textContent = generateLastEdited(note.updatedAt);
};

// Generate the last edited message.
const generateLastEdited = timestamp =>
{
  return `Last edited ${moment(timestamp).fromNow()}`;
};

export {
  generateNoteDOM,
  renderNotes,
  generateLastEdited,
  initializeEditPage
};