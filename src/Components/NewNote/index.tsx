import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Background2 } from "../../Icons/Backgrounds";
import { Container } from "../Container";
import { Input } from "../UI/Input";
import { Error } from "../UI/Error";

import shortid from "shortid";
import { defaultNote, Note } from "../../types";
import { useNotes } from "../../Hooks/useNotes";

export const NewNote = () => {
  const [location, setLocation] = useLocation();
  const { saveNoteLocalStorage } = useNotes();
  const [error, setError] = useState("");
  const [dataNote, setDataNote] = useState<Note>(defaultNote);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !dataNote.title.trim() ||
      !dataNote.description.trim() ||
      !dataNote.author
    ) {
      setError("All fields are required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    saveNoteLocalStorage(dataNote);
    setLocation(`/editor/${dataNote.id}`);
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDataNote({
      ...dataNote,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setDataNote({
      ...dataNote,
      id: shortid.generate(),
    });
  }, []);

  return (
    <Container numCols={2}>
      <form
        onSubmit={submit}
        className="col-span-2 lg:col-span-1 border w-full h-full p-24 w-full flex flex-col items-center lg:items-start justify-center"
      >
        <div className="space-y-2 mb-10">
          <h2 className="text-3xl font-extrabold">
            Hello, Welcome to J-MarkEditor!
          </h2>
          <p className="text-gray-500">Get started totally free</p>
        </div>
        {error.trim() && (
          <div className="space-y-2 mb-10  w-2/4">
            <Error error={error} />
          </div>
        )}
        <Input
          label="Title of your note"
          placeholder="Blog 1"
          name="title"
          type="text"
          value={dataNote.title}
          onChange={inputChange}
        />
        <Input
          label="Description"
          placeholder="Your description"
          name="description"
          type="text"
          value={dataNote.description}
          onChange={inputChange}
        />
        <Input
          label="Author"
          placeholder="Jhon Doe"
          name="author"
          value={dataNote.author}
          type="text"
          onChange={inputChange}
        />

        <div className="w-2/4 mt-5">
          <button
            type="submit"
            className="text-center block bg-blue-500 w-full text-white rounded-lg p-4"
          >
            Get Started
          </button>
        </div>

        <div className="flex space-x-2 items-center justify-start mt-4">
          <input type="checkbox" id="checkbox" disabled />
          <label htmlFor="checkbox">
            <span className="text-gray-500">
              I agree to the{" "}
              <Link href="/new" className="text-blue-500">
                Terms & Service
              </Link>
            </span>
          </label>
        </div>

        <div className="mt-48">
          <Link href="/new" className="text-center text-gray-500">
            Are you already a member?
          </Link>
        </div>
      </form>
      <div className="hidden lg:block col-span-1 flex justify-center items-center h-full bg-blue-300">
        <div className="w-3/5 mx-auto h-full flex justify-center items-center">
          <Background2 />
        </div>
      </div>
    </Container>
  );
};
