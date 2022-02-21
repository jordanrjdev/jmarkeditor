import { useState } from "react";
import { Note } from "../types";
export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const getNotesLocalStorage = (): Note[] => {
    return JSON.parse(localStorage.getItem("notes") || "[]");
  };

  const saveNoteLocalStorage = (note: Note): Note => {
    let notes = getNotesLocalStorage();
    let findNote = notes.find((noteLS: Note) => noteLS.id === note.id);
    if (findNote) {
      notes = notes.map((item: Note) => {
        if (note.id == item.id) {
          return {
            ...note,
            date: new Date().toLocaleString(),
          };
        }
        return item;
      });
    } else {
      notes.push(note);
    }
    localStorage.setItem("notes", JSON.stringify([...notes]));
    return note;
  };

  const getNoteByIdLocalStorage = (id: string): Note | null => {
    let notes = getNotesLocalStorage();
    let findNote = notes.find((noteLS: Note) => noteLS.id === id);
    if (findNote) {
      return findNote;
    }
    return null;
  };

  const deleteByIdLocalStorage = (id: string): void => {
    let notes = getNotesLocalStorage();
    let findNote = notes.find((noteLS: Note) => noteLS.id === id);
    if (findNote) {
      notes = notes.filter((noteLS: Note) => noteLS.id !== id);
      localStorage.setItem("notes", JSON.stringify([...notes]));
    }
  };

  return {
    notes,
    setNotes,
    getNotesLocalStorage,
    saveNoteLocalStorage,
    getNoteByIdLocalStorage,
    deleteByIdLocalStorage,
  };
};
