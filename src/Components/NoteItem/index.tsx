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
    <div className="flex flex-col justify-center border p-3 w-full rounded-md hover:shadow-lg transition-shadow duration-200">
      <h1 className="text-xl font-semibold cursor-pointer">{note.title}</h1>
      <em className="text-gray-600">{note.description}</em>
      <span className="text-blue-400">
        {new Date(note.date).toDateString()}
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
