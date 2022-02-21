// @ts-ignore
import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useNotes } from "../../Hooks/useNotes";
// @ts-ignore
import { Remarkable } from "remarkable";
import { defaultNote, Note } from "../../types";

const md = new Remarkable();

export const Editor = () => {
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute("/editor/:id");
  const [currentNote, setCurrentNote] = useState<Note>(defaultNote);
  const { saveNoteLocalStorage, getNoteByIdLocalStorage } = useNotes();
  const [markdown, setMarkdown] = useState<string>("");
  const [changes, setChanges] = useState<boolean>(false);

  const handleClickSaveButton = () => {
    let nowCurrent: Note = saveNoteLocalStorage({
      ...currentNote,
      content: markdown,
    });
    setCurrentNote(nowCurrent);
  };

  useEffect(() => {
    let currentNoteLS = getNoteByIdLocalStorage(params?.id || "");
    console.log(currentNoteLS);
    if (currentNoteLS) {
      setCurrentNote(currentNoteLS);
    } else {
      setLocation("/");
    }
  }, []);

  useEffect(() => {
    setMarkdown(currentNote.content);
    if (markdown !== currentNote.content) {
      setChanges(true);
    } else {
      setChanges(false);
    }
  }, [currentNote.content]);

  useEffect(() => {
    if (markdown !== currentNote.content) {
      setChanges(true);
    } else {
      setChanges(false);
    }
  }, [markdown]);

  return (
    <div>
      {changes ? (
        <div className="flex items-center justify-between px-5 bg-yellow-100 h-10">
          <span>Changes have been detected in the editor.</span>
          <button
            className="bg-green-500 p-1 px-2 cursor-pointer rounded-lg text-white"
            onClick={handleClickSaveButton}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-5 bg-green-100 h-10">
          <span>There are no changes in the editor.</span>
        </div>
      )}
      <div className={`grid grid-cols-2 h-[calc(100vh_-_85px)] grid-flow-rows`}>
        <div className="col-span-1 editor h-full">
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="textarea w-full h-full bg-gray-700 text-white text-xl p-5 focus:outline-none"
          ></textarea>
        </div>
        <div
          className="col-span-1 prose max-w-full p-5 overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: md.render(markdown) }}
        ></div>
      </div>
    </div>
  );
};
