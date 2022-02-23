import { Link, useRoute } from "wouter";
import { Note } from "../../../types";

type PropsNoteEditor = {
  note: Note;
};
export const NoteEditor = (props: PropsNoteEditor) => {
  const { note } = props;
  const [isActive] = useRoute("/editor/" + props.note.id);

  return (
    <Link href={`/editor/${note.id}`}>
      <a
        className={`block text-gray-400  cursor-pointer pl-10 w-full p-2 flex justify-start items-center ${
          isActive ? "bg-gray-600" : "hover:text-white"
        }`}
      >
        {note.title}
      </a>
    </Link>
  );
};
