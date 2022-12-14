import React, { useState } from "react";
import Modal from "../components/Modal";
import Button from "./Button";
import Mdx from "../components/Mdx";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
const Card = ({ note }) => {
  const [open, setOpen] = useState(false);

  const exportToMd = () => {
    const fileData = note.markdown;
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = note.title + ".md";
    link.href = url;
    link.click();
  };

  return (
    <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-gray-700 text-left">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
        {note.title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">
        {note.markdown}
      </p>
      <div className="flex items-center gap-2">
        <Link
          to={`/notes/${note.slug}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium
        text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800
        focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
        dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
        <Button
          onClick={() => setOpen(true)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium
        text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800
        focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
        dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Preview
        </Button>
      </div>
      <Modal open={open} setOpen={setOpen} displayOnly title={note.title}>
        <p className="dark:text-gray-200 w-full">
          <Mdx mdContent={note?.markdown} />
        </p>
      </Modal>

      <Menu
        className="dark:bg-slate-500"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <button className="absolute top-1 text-gray-500 right-1 hover:outline p-1 rounded-md">
            <FiMoreHorizontal className="w-5 h-5" />
          </button>
        </MenuHandler>
        <MenuList className="p-1 dark:bg-slate-700 dark:border-slate-600">
          <MenuItem
            onClick={exportToMd}
            className="p-2 hover:bg-slate-100 hover:dark:bg-gray-800 text-center"
          >
            Download markdown
          </MenuItem>
          <MenuItem className="p-2 hover:bg-slate-100 hover:dark:bg-gray-800 text-center">
            <Link to={`/notes/${note.slug}/edit`}>Edit note</Link>
          </MenuItem>
          <MenuItem
            disabled
            className="p-2 hover:bg-red-100 hover:dark:bg-red-300 text-center text-red-600"
          >
            Delete note
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Card;
