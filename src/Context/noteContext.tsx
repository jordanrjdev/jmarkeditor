import * as React from "react";
import { Note, NoteContext as NoteContextI } from "../types";

const defaultState = {
  notes: [],
  setNotes: () => {},
};
export const NoteContext = React.createContext<NoteContextI>(defaultState);

const NoteProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = React.useState<Note[]>([]);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
