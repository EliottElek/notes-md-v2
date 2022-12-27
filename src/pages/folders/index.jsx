import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StickyNavbar from "../../components/StickyNavbar";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TextInput from "../../components/TextInput";
import RadioGroup from "../../components/RadioGroup";
import slugify from "react-slugify";

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
            <Link
              to={"/folders/" + folder.id}
              key={folder.id}
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
          ))
        )}

        {user && (
          <button
            onClick={() => setOpen(true)}
            className="ffolder medium pink m-2"
          >
            <span>New</span>
          </button>
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
