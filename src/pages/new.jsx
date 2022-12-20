import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import slugify from "react-slugify";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Button from "../components/Button";
import shortid from "shortid";
import StickyNavbar from "../components/StickyNavbar";
import { useAuth } from "../hooks/useAuth";
import MDEditor from "@uiw/react-md-editor";

const New = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const createNewPost = async () => {
    if (title === "") return;
    try {
      const slug = slugify(title) + shortid.generate();
      await supabase.from("notes").insert({
        markdown: content,
        title: title,
        slug: slug,
      });
      navigate("/notes/" + slug);
    } catch (err) {}
  };
  if (!user) return <Navigate to={"/"} />;

  return (
    <div>
      <StickyNavbar>
        <div className="flex items-center">
          <Link to="/">
            <Button defaultbtn={true}>Cancel</Button>
          </Link>
          <Button onClick={createNewPost}>Publish note</Button>
        </div>
      </StickyNavbar>
      <div className="mt-2 md:p-10 p-4 text-lg text-left">
        <div>
          <input
            type="text"
            id="first_name"
            class="bg-transparent border-none  text-3xl focus:outline-none my-4"
            placeholder="Title of your note..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex h-[60vh] flex-col flex-grow">
          <MDEditor height="100%" value={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
};

export default New;
