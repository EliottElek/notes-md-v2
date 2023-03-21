import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import slugify from "react-slugify";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Button from "../components/Button";
import shortid from "shortid";
import { useAuth } from "../hooks/useAuth";
import Editor from "../components/Editor";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
const New = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const handleEditorChange = ({ text }) => {
    setContent(text);
  };
  const createNewPost = async () => {
    if (title === "") {
      toast.error("You forgot to put a title.", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }
    try {
      const slug = slugify(title) + shortid.generate();
      const { data } = await supabase
        .from("notes")
        .insert({
          markdown: content,
          title: title,
          slug: slug,
        })
        .select("id, slug")
        .single();
      await supabase.from("folders_notes").insert({
        note_id: data.id,
        folder_id: id,
      });
      toast.success("Note successfully created !");

      navigate(`/folders/${id}/notes/${data.slug}`);
    } catch (err) {
      console.log(err);
    }
  };
  if (!user) return <Navigate to={"/"} />;

  return (
    <div>
      <div className="mt-2 md:p-10 p-4 text-lg text-left">
        <div className="flex items-center justify-between">
          <input
            type="text"
            id="first_name"
            class="bg-transparent border-none  text-3xl focus:outline-none my-4"
            placeholder="Title of your note..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button defaultbtn={true}>Cancel</Button>
            </Link>
            <Button onClick={createNewPost}>Publish note</Button>
          </div>
        </div>
        <div className="flex h-[60vh] flex-col flex-grow">
          <Editor
            value={content}
            onChange={handleEditorChange}
            placeholder="Your content goes here..."
          />
        </div>
      </div>
    </div>
  );
};

export default New;
