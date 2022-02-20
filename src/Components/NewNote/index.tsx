import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useNotes } from "../../Context/noteContext";
import { Background2 } from "../../Icons/Backgrounds";
import { Container } from "../Container";
import { Input } from "../UI/Input";
import { Error } from "../UI/Error";

import shortid from "shortid";

const markdownInitialState = `
# Hello, world!
This is a example of markdown.

>Note: this note will be save in LocalStorage and sent to your email.

With ❤️ [Jordan Jaramillo](https://github.com/jordanrjdev)
`;

export const NewNote = () => {
  const [error, setError] = useState("");
  const [location, setLocation] = useLocation();
  const { draft, resetDraft, handleDraft, saveNote, setCurrentNote } =
    useNotes();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !draft.title.trim() ||
      !draft.description.trim() ||
      !draft.author.trim()
    ) {
      setError("All fields are required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    let newNote = {
      title: draft.title,
      description: draft.description,
      author: draft.author,
      id: shortid.generate(),
      date: new Date().toLocaleString(),
      content: markdownInitialState,
    };
    saveNote(newNote);
    setCurrentNote(newNote);
    setLocation(`/editor`);
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleDraft(e.target.name, e.target.value);
  };

  useEffect(() => {
    resetDraft();
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
          value={draft.title}
          onChange={inputChange}
        />
        <Input
          label="Description"
          placeholder="Your description"
          name="description"
          type="text"
          value={draft.description}
          onChange={inputChange}
        />
        <Input
          label="Author"
          placeholder="Jhon Doe"
          name="author"
          value={draft.author}
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
