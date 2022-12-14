import React, { useState } from "react";
import Editor from "../components/Editor";
import { supabase } from "../lib/supabase";
import slugify from "react-slugify";
import { useNavigate, Link } from "react-router-dom";
import Mdx from "../components/Mdx";
import Button from "../components/Button";
import shortid from "shortid";
import StickyNavbar from "../components/StickyNavbar";
const New = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

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
  return (
    <div>
      <StickyNavbar>
        <div className="flex pb-4">
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
        <Editor content={content} setContent={setContent} />
        <Mdx mdContent={content} />
      </div>
    </div>
  );
};

export default New;
