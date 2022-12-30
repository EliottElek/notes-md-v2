import React, { useEffect, useState } from "react";
import StickyNavbar from "../../components/StickyNavbar";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TextInput from "../../components/TextInput";
import RadioGroup from "../../components/RadioGroup";
import slugify from "react-slugify";
import Folder from "../../components/Folder";

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

const Folders = () => {
  const { user } = useAuth();
  const [folders, setFolders] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(plans[0]);

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const { data } = await supabase
          .from("folders")
          .select("* ,folders_notes(notes!inner(count))");
        setFolders(data);
        console.log("dfdfdfs");
      } catch (e) {
        console.log(e);
      }
    };
    loadFolders();
  }, [setFolders]);

  const handleNewFolder = async () => {
    try {
      const slug = slugify(value);

      const { data } = await supabase
        .from("folders")
        .insert({
          name: value,
          slug: slug,
          color: selected?.color,
        })
        .select("* ,folders_notes(notes!inner(count))")
        .single();
      setFolders([...folders, data]);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <StickyNavbar>
        {user && (
          <Button onClick={() => setOpen(true)} defaultbtn={true}>
            New folder
          </Button>
        )}
      </StickyNavbar>
      <div className="folder__grid">
        {!folders ? (
          <div className="flex justify-center mt-10 items-center">
            <Loader />
          </div>
        ) : (
          folders.map((folder) => (
            <Folder
              setFolders={setFolders}
              folders={folders}
              key={folder.id}
              folder={folder}
            />
          ))
        )}
      </div>
      {user && (
        <Modal
          open={open}
          setOpen={setOpen}
          onCancel={() => setOpen(false)}
          onValidate={handleNewFolder}
          title={"New folder"}
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
      )}
    </div>
  );
};

export default Folders;
