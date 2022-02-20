import { useLocation } from "wouter";
import { useNotes } from "../../Context/noteContext";
import { Note } from "../../types";

export const NoteItem = ({ note }: { note: Note }) => {
  const [location, setLocation] = useLocation();
  const { setCurrentNote, deleteNote } = useNotes();

  const edit = (note: Note) => {
    setCurrentNote(note);
    setLocation(`/editor`);
  };
  return (
    <div className="flex flex-col justify-center bg-gray-300 p-3 w-full rounded-md">
      <h1 className="text-xl font-semibold cursor-pointer">{note.title}</h1>
      <span className="text-blue-500">
        <em className="text-black font-semibold">{note.author} -</em>{" "}
        {note.date}
      </span>

      <div className="space-x-4 mt-1">
        <span
          className="cursor-pointer underline text-black"
          onClick={() => edit(note)}
        >
          Edit
        </span>
        <span
          className="cursor-pointer underline text-red-600"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </span>
      </div>
    </div>
  );
};
