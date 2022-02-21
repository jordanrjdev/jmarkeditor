import { useLocation } from "wouter";
import { useNotes } from "../../Hooks/useNotes";
import { Note } from "../../types";

export const NoteItem = ({
  note,
  syncNotes,
}: {
  note: Note;
  syncNotes: Function;
}) => {
  const [location, setLocation] = useLocation();
  const { deleteByIdLocalStorage } = useNotes();

  const edit = (note: Note) => {
    setLocation(`/editor/${note.id}`);
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
          onClick={() => {
            deleteByIdLocalStorage(note.id);
            syncNotes();
          }}
        >
          Delete
        </span>
      </div>
    </div>
  );
};
