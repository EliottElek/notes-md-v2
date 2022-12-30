import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../../components/Button";
import Mdx from "../../components/Mdx";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import SpeedDial from "../../components/SpeedDial";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router";
import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import StickyNavbar from "../../components/StickyNavbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Breadcrumbs from "../../components/BreadCrumbs";

const Note = () => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(null);
  const [folder, setFolder] = useState(null);

  const { user } = useAuth();

  const { id, slug } = useParams();
  let navigate = useNavigate();

  const handleDeleteNote = async () => {
    try {
      await supabase.from("folders_notes").delete().eq("note_id", note.id);
      await supabase.from("notes").delete().eq("id", note.id);
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  useEffect(() => {
    const loadNote = async () => {
      try {
        let { data } = await supabase
          .from("notes")
          .select(
            "slug, title, markdown, id, folders_notes(folders!inner(name, id))"
          )
          .eq("slug", slug)
          .single();
        setFolder(data?.folders_notes[0].folders);
        setNote(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadNote();
  }, [slug, setNote]);

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
    <>
      <StickyNavbar>
        <div className="flex w-full items-center justify-between">
          {user && (
            <div className="flex">
              <Link to={`/folders/${id}`}>
                <Button defaultbtn={true}>
                  <ChevronLeftIcon className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <Link to={"edit"}>
                <Button defaultbtn={true}>
                  Edit <FiEdit />
                </Button>
              </Link>
              <Button onClick={() => setOpen(true)} deletebtn={true}>
                Delete <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div>
            <Button onClick={exportToMd} defaultbtn={true}>
              Export to markdown
            </Button>
          </div>
        </div>
      </StickyNavbar>
      <div className="md:px-12 px-6 mt-2">
        <Breadcrumbs
          links={[
            {
              label: folder?.name,
              href: "/folders/" + folder?.id,
            },
            {
              disabled: true,
              label: note?.title,
            },
          ]}
        />
      </div>
      {!note ? (
        <div className="flex justify-center w-full h-[40vh] items-center ">
          <Loader />
        </div>
      ) : (
        <div className="md:p-10 p-4 text-left m-auto min-h-screen max-w-4xl dark:md:bg-gray-600 sm:md:bg-gray-50 my-4 rounded-lg shadow-sm">
          <Mdx mdContent={note?.markdown} />
        </div>
      )}
      <Modal
        open={open}
        setOpen={setOpen}
        onValidate={handleDeleteNote}
        onCancel={() => setOpen(false)}
      >
        <p className="text-lg text-gray-800 dark:text-gray-100">
          Are you sure you want to delete this note ?
        </p>
      </Modal>
      {user && (
        <SpeedDial onDowload={exportToMd} onDelete={() => setOpen(true)} />
      )}
    </>
  );
};

export default Note;
