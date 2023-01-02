import React from "react";
import { Link } from "react-router-dom";
import Mdx from "./Mdx";

const Note = ({ note }) => {
  console.log(note);
  return (
    <Link to={"notes/" + note.slug}>
      <div className="w-full text-center">
        <div className="mini_mdx">
          <Mdx mdContent={note.markdown} />
        </div>
        {note.title}
      </div>
    </Link>
  );
};

export default Note;
