import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Button from "../../components/Button";
import StickyNavbar from "../../components/StickyNavbar";
import Loader from "../../components/Loader";
import { Navigate } from "react-router";
// import slugify from "react-slugify";
// import shortid from "shortid";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import MDEditor from "@uiw/react-md-editor";

const Edit = () => {
  const [content, setContent] = useState(null);
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(false);
  const { id, slug } = useParams();
  const { user } = useAuth();

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
    } catch (err) {}
  };

  if (!user) return <Navigate to={"/"} />;

  return (
    <div>
      <StickyNavbar>
        <div className="flex flex-col">
          <div className="flex items-center">
            <Link to={`/folders/${id}/notes/${note?.slug}`}>
              <Button defaultbtn={true}>
                <ChevronLeftIcon className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <Button onClick={saveNewPost}>
              {loading ? "Saving..." : "Save note"}
            </Button>
          </div>
        </div>
      </StickyNavbar>
      {!note ? (
        <div className="flex justify-center w-full h-[40vh] items-center ">
          <Loader />
        </div>
      ) : (
        <div className="md:p-10 p-4">
          <div>
            <div>
              <input
                type="text"
                id="first_name"
                className="bg-transparent border-none text-3xl focus:outline-none w-full mt-3"
                placeholder="Title of your note..."
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex h-[70vh] flex-col flex-grow">
            <MDEditor
              style={{ padding: 15 }}
              height="100%"
              value={content}
              onChange={setContent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
