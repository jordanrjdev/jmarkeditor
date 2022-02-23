import { Dispatch, SetStateAction, useState } from "react";
import { useNotes } from "../../Hooks/useNotes";
import { MenuDown, MenuRight } from "../../Icons";
import { Note } from "../../types";
import { NoteEditor } from "../NoteItem/NoteEditor";

export const Sidebar = () => {
  let { notes } = useNotes();
  const [open, setOpen] = useState(true);

  const renderItem = (note: Note) => <NoteEditor key={note.id} note={note} />;
  return (
    <div className="bg-zinc-800 flex flex-col border-r border-r-black w-72">
      <p className="text-white text-lg pt-3 mb-2 pl-6 font-semibold uppercase">
        Explorer
      </p>
      <p
        onClick={() => setOpen(!open)}
        className="text-white font-semibold text-lg uppercase flex justify-start items-center hover:border hover:border-gray-50 box-border cursor-pointer w-full"
      >
        {open ? <MenuDown /> : <MenuRight />}
        Your notes md
      </p>
      <div className="w-full h-full overflow-y-auto">
        {open && notes.map(renderItem)}
      </div>
    </div>
  );
};
