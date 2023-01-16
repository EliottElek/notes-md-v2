import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Mdx from "../../components/Mdx";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import {
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { exportToMd } from "../../lib/exportToMd";
import SpeedDial from "../../components/SpeedDial";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Context from "../../components/Context";
import {
  PencilSquareIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Breadcrumbs from "../../components/BreadCrumbs";
const Note = () => {
  const [open, setOpen] = useState(false);
  const { currentNote, setCurrentNote } = useContext(Context);
  const { user } = useAuth();
  const { slug } = useParams();
  let navigate = useNavigate();

  const handleDeleteNote = async () => {
    try {
      await supabase
        .from("folders_notes")
        .delete()
        .eq("note_id", currentNote.id);
      await supabase.from("notes").delete().eq("id", currentNote.id);
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      const code = event.which || event.keyCode;

      let charCode = String.fromCharCode(code).toLowerCase();
      if ((event.ctrlKey || event.metaKey) && charCode === "e") {
        event.preventDefault();
        navigate("edit");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
  useEffect(() => {
    const loadNote = async () => {
      try {
        let { data } = await supabase
          .from("notes")
          .select("slug, title, markdown, id, folder:folders(name, id)")
          .eq("slug", slug)
          .single();
        setCurrentNote({ ...data, saved: true });
      } catch (err) {
        console.log(err);
      }
    };
    loadNote();
  }, [slug, setCurrentNote]);

  return (
    <>
      {!currentNote ? (
        <div className="flex justify-center w-full h-[40vh] items-center ">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex p-1 justify-center px-4 sticky z-10 w-full top-10 right-0 dark:bg-blue-gray-700 bg-gray-50">
            <div className="hidden md:flex w-full dark:bg-blue-gray-700 bg-gray-50">
              <Breadcrumbs
                links={[
                  { label: "MobiSec", href: "/folders/1" },
                  { label: "Challenge 3" },
                ]}
              />
            </div>
            <div className="flex dark:bg-blue-gray-700 bg-gray-50 justify-end w-full md:w-auto md:absolute right-4 items-center">
              <Tooltip
                placement="left"
                content="Edit note"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <Link
                  to={"edit"}
                  className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1"
                >
                  <PencilSquareIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </Link>
              </Tooltip>
              <Menu>
                <MenuHandler>
                  <button className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1">
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                  </button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => exportToMd(currentNote)}>
                    Download
                  </MenuItem>
                  <MenuItem onClick={() => setOpen(true)}>Delete</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <div className="md:p-10 p-4 text-left m-auto min-h-screen max-w-4xl mt-10 my-4 rounded-lg">
            <Mdx mdContent={currentNote?.markdown} />
          </div>
        </>
      )}
      <Modal
        open={open}
        setOpen={setOpen}
        onValidate={handleDeleteNote}
        onCancel={() => setOpen(false)}
      >
        <p className="text-lg text-blue-gray-800 dark:text-blue-gray-100">
          Are you sure you want to delete this note ?
        </p>
      </Modal>
      {user && (
        <SpeedDial
          onDowload={() => exportToMd(currentNote)}
          onDelete={() => setOpen(true)}
        />
      )}
    </>
  );
};

export default Note;
