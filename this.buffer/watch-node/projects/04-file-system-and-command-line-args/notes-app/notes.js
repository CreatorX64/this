import * as fs from "fs";
import chalk from "chalk";

export function addNote(title, body) {
  const notes = loadNotes();
  const isDuplicate = notes.some((note) => note.title === title);

  if (!isDuplicate) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
}

export function listNotes() {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"));
  notes.forEach((note) => console.log(note.title));
}

export function readNote(title) {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
}

export function removeNote(title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
}

function saveNotes(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
}

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}
