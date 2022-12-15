import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../../components/Button";
import Mdx from "../../components/Mdx";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Chip from "../../components/Chip";
import SpeedDial from "../../components/SpeedDial";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router";
import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import StickyNavbar from "../../components/StickyNavbar";
import { Link } from "react-router-dom";

const Note = () => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(null);
  const [tags, setTags] = useState([]);

  const { slug } = useParams();
  let navigate = useNavigate();

  const handleDeleteNote = async () => {
    try {
      await supabase.from("notes").delete().eq("id", note.id);
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  useEffect(() => {
    const t = note?.notes_tags.map(({ tags }) => tags);
    setTags(t);
  }, [note]);
  useEffect(() => {
    const loadNote = async () => {
      try {
        let { data } = await supabase
          .from("notes")
          .select("slug, title, markdown, id, notes_tags(tags!inner(*))")
          .eq("slug", slug);
        setNote(data[0]);
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
        <div className="flex w-full items-center justify-between ">
          <div className="flex">
            <Link to="/">
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
          <div>
            <Button onClick={exportToMd} defaultbtn={true}>
              Export to markdown
            </Button>
          </div>
        </div>
      </StickyNavbar>
      {!note ? (
        <div className="flex justify-center w-full h-[40vh] items-center ">
          <Loader />
        </div>
      ) : (
        <div className="md:p-10 p-4 text-left">
          <div>
            <div className="flex mt-3 gap-1">
              {tags?.length !== 0 && tags?.map((t) => <Chip color={t?.color}>{t?.label}</Chip>)}
            </div>
            <h1>{note?.title}</h1>
          </div>
          <Mdx mdContent={note?.markdown} />
        </div>
      )}
      <Modal
        open={open}
        setOpen={setOpen}
        onValidate={handleDeleteNote}
        onCancel={() => setOpen(false)}
      >
        <p className="text-lg text-slate-800 dark:text-gray-100">
          Are you sure you want to delete this note ? 
        </p>
      </Modal>
      <SpeedDial onDowload={exportToMd} onDelete={() => setOpen(true)} />
    </>
  );
};

export default Note;
