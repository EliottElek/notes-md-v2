import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/Loader";
import Note from "../../components/Note";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
const Folder = () => {
  const [folder, setFolder] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const loadFolder = async () => {
      try {
        const { data } = await supabase
          .from("folders")
          .select("* , notes(*)")
          .eq("id", id)
          .single();
        setFolder(data);
      } catch (err) {}
    };
    loadFolder();
  }, [setFolder, id]);
  return (
    <div>
      {!folder?.notes ? (
        <div className="flex justify-center mt-10 items-center">
          <Loader />
        </div>
      ) : (
        <main className={"folder__grid"}>
          {folder?.notes?.map((note) => (
            <Note key={note.id} note={note} />
          ))}
          {folder?.notes.length === 0 && (
            <Link to="new">
              <div className="rounded-md p-4 m-4 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-blue-gray-600 shadow-sm sm:h-[310px] h-[70vh]">
                New note
              </div>
            </Link>
          )}
        </main>
      )}
    </div>
  );
};

export default Folder;
