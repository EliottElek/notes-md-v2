import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Button from "../../components/Button";
import StickyNavbar from "../../components/StickyNavbar";
import Loader from "../../components/Loader";
import { Navigate } from "react-router";
import { toast } from "react-hot-toast";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import Editor from "../../components/Editor";
const Edit = () => {
  const [content, setContent] = useState(null);
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(false);
  const { id, slug } = useParams();
  const { user } = useAuth();

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  useEffect(() => {
    const loadNote = async () => {
      try {
        const { data } = await supabase
          .from("notes")
          .select(`*`)
          .eq("slug", slug)
          .limit(1)
          .single();

        setNote(data);
        setTitle(data.title);
        setContent(data.markdown);
      } catch (err) {}
    };
    loadNote();
  }, [setNote, setTitle, slug]);

  const saveNewPost = async () => {
    setLoading(true);

    try {
      await supabase
        .from("notes")
        .update({
          markdown: content,
          title: title,
        })
        .eq("id", note.id);
      setLoading(false);
      toast.success("Note was successfully saved.");
    } catch (err) {}
  };

  if (!user) return <Navigate to={"/"} />;

  return (
    <div>
      {!note ? (
        <div className="flex justify-center w-full h-[40vh] items-center ">
          <Loader />
        </div>
      ) : (
        <div className="flex -mt-2 flex-1 flex-col h-[calc(100vh_-_40px)] flex-grow">
          <Editor
            value={content}
            onChange={handleEditorChange}
            placeholder="Your content goes here..."
          />
        </div>
      )}
    </div>
  );
};

export default Edit;
