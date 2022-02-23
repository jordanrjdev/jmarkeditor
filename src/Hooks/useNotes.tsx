import { useContext, useState } from "react";
import { NoteContext } from "../Context/noteContext";
import { Note } from "../types";
export const useNotes = () => {
  const { notes, setNotes } = useContext(NoteContext);

  const getNotesLocalStorage = (): void => {
    let notesLS = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes([...notesLS]);
  };

  const saveNoteLocalStorage = (note: Note): Note => {
    let findNote = notes.find((noteLS: Note) => noteLS.id === note.id);
    let newNotes = [...notes];
    if (findNote) {
      newNotes = notes.map((item: Note) => {
        if (note.id == item.id) {
          return {
            ...note,
            date: new Date().toLocaleString(),
          };
        }
        return item;
      });
      setNotes([...newNotes]);
      localStorage.setItem("notes", JSON.stringify([...newNotes]));
    } else {
      setNotes([...newNotes, note]);
      localStorage.setItem("notes", JSON.stringify([...newNotes, note]));
    }
    return note;
  };

  const getNoteByIdLocalStorage = (id: string): Note | null => {
    let findNote = JSON.parse(localStorage.getItem("notes") || "[]").find(
      (noteLS: Note) => noteLS.id === id
    );
    if (findNote) {
      return findNote;
    }
    return null;
  };

  const deleteByIdLocalStorage = (id: string): void => {
    let findNote = notes.find((noteLS: Note) => noteLS.id === id);
    if (findNote) {
      let newNotes = notes.filter((noteLS: Note) => noteLS.id !== id);
      localStorage.setItem("notes", JSON.stringify([...newNotes]));
      setNotes([...newNotes]);
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
