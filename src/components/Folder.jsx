import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContextMenu from "./ContextMenu";
import Modal from "./Modal";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";
import { MenuItem } from "react-contextmenu";
const plans = [
  {
    name: "Cyan (default)",
    color: "cyan",
    checked: true,
  },
  {
    name: "Pink",
    color: "pink",
  },
  {
    name: "Yellow",
    color: "yellow",
  },
];
const Folder = ({ folder, setFolders, folders }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [selected, setSelected] = useState(
    plans.find((plan) => plan.color === folder.color || plan[0])
  );
  const [value, setValue] = useState(folder?.name);

  const handleRename = async () => {
    try {
      await supabase
        .from("folders")
        .update({ name: value, color: selected.color })
        .eq("id", folder.id);
      let folds = [...folders];
      folds.find((fold) => fold.id === folder.id).name = value;
      folds.find((fold) => fold.id === folder.id).color = selected.color;
      setFolders(folds);
      toast.success("Folder successfully renamed.");
    } catch (e) {
      toast.error("An error occured renaming the folder.");
    }
    setOpenUpdate(false);
  };
  const handleDelete = async () => {
    try {
      // delete all notes first
      await supabase.from("folders_notes").delete().eq("folder_id", folder.id);
      await supabase.from("folders").delete().eq("id", folder.id);
      let folds = [...folders];
      const index = folds.findIndex((fold) => fold.id === folder.id);
      folds.splice(index, 1);
      setFolders(folds);
      toast.success("Folder successfully deleted.");
    } catch (e) {
      toast.error("An error occured deleting the folder.");
    }
    setOpenDelete(false);
  };
  return (
    <>
      <ContextMenu
        items={
          <>
            <MenuItem
              onClick={() => setOpenUpdate(true)}
              class="flex hover:bg-blue-gray-100 py-1 px-2 rounded gap-2"
            >
              <div>Rename</div>
            </MenuItem>
            <MenuItem
              onClick={() => setOpenDelete(true)}
              class="flex hover:bg-blue-gray-100 py-1 px-2 rounded gap-2"
            >
              <div>Delete</div>
            </MenuItem>
          </>
        }
      >
        <Link
          to={"/folders/" + folder.id}
          className="flex flex-col justify-center"
        >
          <div
            className={`ffolder medium ${
              folder?.color ? folder?.color : "cyan"
            } m-2`}
          >
            <span>{folder.folders_notes.length}</span>
          </div>
          <span className="text-center">{folder.name}</span>
        </Link>
      </ContextMenu>
      <Modal
        open={openUpdate}
        setOpen={setOpenUpdate}
        onCancel={() => setOpenUpdate(false)}
        onValidate={handleRename}
        title={"Edit folder"}
      >
        <TextInput
          value={value}
          className="text-2xl"
          placeHolder="Your folder's name..."
          onChange={(e) => setValue(e.target.value)}
        />
        <RadioGroup
          selected={selected}
          setSelected={setSelected}
          plans={plans}
        />
      </Modal>
      <Modal
        open={openDelete}
        submitDisabled={confirmation !== folder?.name}
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
          Enter <span className="text-red-500 font-bold">{folder?.name}</span>{" "}
          to delete it.
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

export default Folder;
