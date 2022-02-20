export type NoteContext = {
  notes: Note[];
  draft: Draft;
  currentNote: Note;
  deleteNote(id: string): void;
  resetDraft(): void;
  handleDraft(p1: string, p2: string): void;
  getNotes(): void;
  saveNote(note: Note): void;
  setCurrentNote(note: Note): void;
};

export type Note = {
  title: string;
  author: string;
  description: string;
  id: string;
  date: string;
  content: string;
};

export type Draft = {
  title: string;
  description: string;
  author: string;
};

export const defaultNote: Note = {
  id: "",
  title: "",
  author: "",
  description: "",
  date: "",
  content: "",
};
