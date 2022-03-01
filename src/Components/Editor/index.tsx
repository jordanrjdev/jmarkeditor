import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useNotes } from "../../Hooks/useNotes";
// @ts-ignore
import { Remarkable } from "remarkable";
import { defaultNote, Note } from "../../types";
import { Sidebar } from "../Sidebar";
import { TextEditor } from "./TextEditor";
import { Loader } from "../UI/Loader";

const md = new Remarkable();

export const Editor = () => {
  const [loading, setLoading] = useState(false);
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

  const onLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    let currentNoteLS = getNoteByIdLocalStorage(params?.id || "");
    if (!currentNoteLS) {
      setLocation("/");
    } else {
      onLoading();
      setMarkdown(currentNoteLS.content);
      setCurrentNote(currentNoteLS);
    }
  }, [location]);

  useEffect(() => {
    if (markdown !== currentNote.content) {
      setChanges(true);
    } else {
      setChanges(false);
    }
  }, [markdown, currentNote]);

  return (
    <>
      <div className="flex items-center border-b border-b-black justify-between px-5 bg-zinc-800 h-10">
        <span className={changes ? "text-blue-400" : "text-white"}>
          {changes
            ? "• Changes have been detected in the editor."
            : "There are no changes in the editor."}
        </span>
        {changes && (
          <button
            className="bg-green-500 p-1 px-2 cursor-pointer rounded-lg text-white"
            onClick={handleClickSaveButton}
          >
            Save
          </button>
        )}
      </div>

      <div
        className={`flex min-h-[calc(100vh_-_85px)]  max-h-[calc(100vh_-_85px)]`}
      >
        <Sidebar />

        <div className="flex-1 grid grid-cols-12 max-w-full">
          {loading && <Loader />}
          {!loading && (
            <>
              <TextEditor
                initialDoc={markdown}
                onChange={(code) => setMarkdown(code)}
              />

              <div
                className="col-span-6 prose max-w-full p-5 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: md.render(markdown) }}
              ></div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
