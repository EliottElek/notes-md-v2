import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mdx from "./Mdx";
import Draggable from "react-draggable";
import Modal from "./Modal";
import TextInput from "./TextInput";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";
const Note = ({ note }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [value, setValue] = useState(note?.title);
  const navigate = useNavigate();

  const handleRename = async () => {
    try {
      await supabase.from("notes").update({ title: value }).eq("id", note.id);
      toast.success("Note successfully renamed.");
      setTimeout(() => window.location.reload(), 2000);
    } catch (e) {
      toast.error("An error occured renaming the note.");
    }
    setOpenUpdate(false);
  };
  const handleDelete = async () => {
    try {
      // delete all notes first
      await supabase.from("folders_notes").delete().eq("note_id", note.id);
      await supabase.from("notes").delete().eq("id", note.id);
      toast.success("Note successfully deleted.");
      setTimeout(() => window.location.reload(), 2000);
    } catch (e) {
      toast.error("An error occured deleting the note.");
    }
    setOpenDelete(false);
  };
  return (
    <>
      <Draggable
        onDrag={() => setIsDragging(true)}
        onStop={() => {
          if (!isDragging) {
            navigate("/notes/" + note?.slug);
          }
          setIsDragging(false);
        }}
      >
        <div className={["w-full text-center", isDragging && "z-50"].join(" ")}>
          <div className="mini_mdx">
            <Mdx mdContent={note?.markdown} />
          </div>
          <p>{note?.title}</p>
        </div>
      </Draggable>
      <Modal
        open={openUpdate}
        setOpen={setOpenUpdate}
        onCancel={() => setOpenUpdate(false)}
        onValidate={handleRename}
        title={"Edit note"}
      >
        <TextInput
          value={value}
          className="text-2xl"
          placeHolder="Your note's name..."
          onChange={(e) => setValue(e.target.value)}
        />
      </Modal>
      <Modal
        open={openDelete}
        submitDisabled={confirmation !== note?.title}
        setOpen={setOpenDelete}
        onCancel={() => setOpenDelete(false)}
        onValidate={handleDelete}
        title={"Delete folder"}
      >
        <div className="dark:text-blue-gray-50">
          <p>
            Are you sure you want to delete this folder ? All it's content will
            also be deleted.
          </p>
          Enter <span className="text-red-500 font-bold">{note?.title}</span> to
          delete it.
          <TextInput
            placeHolder="Confirm here..."
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default Note;
