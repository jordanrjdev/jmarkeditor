import React, { useEffect } from "react";
import { NoteContext, Note, defaultNote } from "../types";

const defaultNotes: Note[] = [];

const defaultDraft = {
  title: "",
  description: "",
  author: "",
};
export const ManageNoteContext: React.Context<NoteContext> =
  React.createContext({
    notes: defaultNotes,
    currentNote: defaultNote,
    draft: defaultDraft,
    deleteNote: (id: string) => {},
    resetDraft: () => {},
    handleDraft: (p1, p2) => {},
    getNotes: () => {},
    saveNote: (note: Note) => {},
    setCurrentNote: (note: Note) => {},
  });

export const useNotes = () => React.useContext(ManageNoteContext);

export const NoteManager: React.FC = ({ children }) => {
  const [notesState, setNotesState] = React.useState({
    notes: defaultNotes,
    currentNote: defaultNote,
  });

  const [draftState, setDraftState] = React.useState({
    title: "",
    description: "",
    author: "",
  });
  const getNotes = (): void => {
    let notesLS = JSON.parse(localStorage.getItem("notes") || "[]");
    if (notesLS) {
      setNotesState({ ...notesState, notes: notesLS });
    }
  };

  const saveNote = (note: Note): void => {
    let notesLS = JSON.parse(localStorage.getItem("notes") || "[]");
    let findNote = notesLS.find((noteLS: Note) => noteLS.id === note.id);
    if (findNote) {
      notesLS = notesLS.map((item: Note) => {
        if (note.id == item.id) {
          return {
            ...note,
            date: new Date().toLocaleString(),
          };
        }
        return item;
      });
    } else {
      notesLS.push(note);
    }
    localStorage.setItem("notes", JSON.stringify([...notesLS]));
    setCurrentNote(note);
  };

  const deleteNote = (id: string): void => {
    let notesLS = JSON.parse(localStorage.getItem("notes") || "[]");
    notesLS = notesLS.filter((note: Note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify([...notesLS]));
    setNotesState({ ...notesState, notes: notesLS });
  };

  const setCurrentNote = (note: Note): void => {
    setNotesState({ ...notesState, currentNote: note });
  };

  const handleDraft = (nameField: string, valueField: string): void => {
    setDraftState({ ...draftState, [nameField]: valueField });
  };

  const resetDraft = (): void => {
    setDraftState({ ...draftState, title: "", description: "", author: "" });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <ManageNoteContext.Provider
      value={{
        notes: notesState.notes,
        currentNote: notesState.currentNote,
        draft: draftState,
        resetDraft,
        handleDraft,
        setCurrentNote,
        getNotes,
        saveNote,
        deleteNote,
      }}
    >
      {children}
    </ManageNoteContext.Provider>
  );
};
