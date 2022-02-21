export type NoteContext = {
  notes: Note[];
  draft: Draft;
  currentNote: Note;
  setNotes: (notes: Note[]) => void;
  deleteNote(id: string): void;
  resetDraft(): void;
  handleDraft(p1: string, p2: string): void;
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

const markdownInitialState: string = `# Hello, world!
This is a example of markdown.

>Note: this note will be save in LocalStorage and sent to your email.

With ❤️ [Jordan Jaramillo](https://github.com/jordanrjdev)`;

export const defaultNote: Note = {
  id: "",
  title: "",
  author: "",
  description: "",
  date: "",
  content: markdownInitialState,
};
