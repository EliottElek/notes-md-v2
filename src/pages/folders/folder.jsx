import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button";
import StickyNavbar from "../../components/StickyNavbar";
import Loader from "../../components/Loader";
import { FiEdit } from "react-icons/fi";
import Note from "../../components/Note";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Breadcrumbs from "../../components/BreadCrumbs";
const Folder = () => {
  const [folder, setFolder] = useState(null);
  const { user } = useAuth();
  const { id } = useParams();
  useEffect(() => {
    const loadFolder = async () => {
      try {
        const { data } = await supabase
          .from("folders")
          .select("* ,folders_notes(notes!inner(*))")
          .eq("id", id)
          .single();
        setFolder(data);
      } catch (err) {}
    };
    loadFolder();
  }, [setFolder, id]);
  return (
    <div>
      <StickyNavbar>
        {user && (
          <Link to="new">
            <Button defaultbtn={true}>
              Add a new note <FiEdit />
            </Button>
          </Link>
        )}
      </StickyNavbar>

      <div className="md:px-12 px-6 mt-2">
        <Breadcrumbs
          links={[
            {
              label: folder?.name,
              href: "/folders/" + folder?.id,
            },
          ]}
        />
      </div>
      {!folder?.folders_notes ? (
        <div className="flex justify-center mt-10 items-center">
          <Loader />
        </div>
      ) : (
        <main className={"folder__grid"}>
          {folder?.folders_notes?.map(({ notes: note }) => (
            <Note key={note.id} note={note} />
          ))}
          {folder?.folders_notes.length === 0 && (
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
