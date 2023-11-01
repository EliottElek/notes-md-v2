import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useParams } from "react-router";
import Loader from "../../components/Loader";
import { Navigate } from "react-router";
// import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import Editor from "../../components/Editor";
import toast from "react-hot-toast";
import Context from "../../components/Context";
import { CheckCircleIcon, StopCircleIcon } from "@heroicons/react/24/outline";
const Edit = () => {
  const [content, setContent] = useState(null);
  const [note, setNote] = useState(null);
  const [saved, setSaved] = useState(true);
  const { setCurrentNote } = useContext(Context);
  const { slug } = useParams();
  const { user } = useAuth();
  const handleEditorChange = ({ text }) => {
    setContent(text);
  };
  useEffect(() => {
    if (content === note?.markdown) {
      setSaved(true);
      setCurrentNote((prev) => {
        return { ...prev, saved: true };
      });
    } else {
      setSaved(false);
      setCurrentNote((prev) => {
        return { ...prev, saved: false };
      });
    }
  }, [content, setCurrentNote, setSaved, note?.markdown]);
  useEffect(() => {
    const savePost = async () => {
      try {
        await supabase
          .from("notes")
          .update({
            markdown: content,
          })
          .eq("id", note?.id);
        toast.success("Saved !");
        note.markdown = content;
        setSaved(true);
        setCurrentNote((prev) => {
          return { ...prev, saved: true };
        });
      } catch (err) {
        console.log(err);
        toast.error("An error occured saving the note.");
      }
    };
    const handleKeyDown = (event) => {
      const code = event.which || event.keyCode;

      let charCode = String.fromCharCode(code).toLowerCase();
      if ((event.ctrlKey || event.metaKey) && charCode === "s") {
        event.preventDefault();
        if (saved) return;

        savePost();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [content, note?.id, note, saved, setCurrentNote]);
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
        setContent(data.markdown);
      } catch (err) {}
    };
    loadNote();
  }, [setNote, slug]);

  if (!user) return <Navigate to={"/"} />;

  return (
    <div>
      {!note ? (
        <div className="flex justify-center w-full h-[40vh] items-center ">
          <Loader />
        </div>
      ) : (
        <div className="flex -mt-2 flex-1 relative flex-col h-[calc(100vh_-_40px)] flex-grow">
          {saved ? (
            <span className=" bg-green-100 text-green-500  hidden lg:flex absolute right-16 mx-3 px-2 p-1/2 translate-y-1/2 rounded-full  z-50 top-0 text-sm items-center gap-1">
              saved <CheckCircleIcon className="h-4 w-4" />
            </span>
          ) : (
            <span className=" bg-orange-100 text-orange-500 hidden lg:flex absolute right-16 mx-3 px-2 p-1/2 translate-y-1/2 rounded-full  z-50 top-0 text-sm items-center gap-1">
              not saved <StopCircleIcon className=" h-4 w-4" />
            </span>
          )}
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
