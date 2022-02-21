import { Link } from "wouter";
import { GithubIcon, TwitterIcon } from "../../Icons";
import { NavLinks } from "../UI/NavLinks";
import { Separator } from "../UI/Separator";

export const Navbar = () => {
  return (
    <nav className="w-full py-5 grid grid-cols-2 px-5 border-b border-bottom ">
      <div className="nav-brand">
        <Link
          to="/"
          className="font-black text-2xl text-white bg-gray-800 hover:bg-black transition easy-in-out duration-200 p-2 rounded"
        >
          J-MarkEditor
        </Link>
      </div>
      <div className="nav-links flex justify-end items-center space-x-4">
        <NavLinks href="/">Docs</NavLinks>
        <NavLinks href="/new">New note</NavLinks>
        <NavLinks href="/mynotes">My Notes</NavLinks>
        <Separator />
        <a
          href="https://github.com/jordanrjdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
        <a
          href="https://twitter.com/jordanrjdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </a>
      </div>
    </nav>
  );
};
