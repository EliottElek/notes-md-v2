import { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Modal from "./Modal";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";
import slugify from "react-slugify";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import SettingsModal from "./SettingsModal";
const Context = createContext();

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
export default Context;

export function ContextProvider({ children }) {
  const [tabs, setTabs] = useLocalStorage("TABS", []);
  const { user } = useAuth();
  const [folders, setFolders] = useState(null);
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const [openDeleteNote, setOpenDeleteNote] = useState(false);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(plans[0]);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const exportToMd = (note) => {
    const fileData = note.markdown;
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = note.title + ".md";
    link.href = url;
    link.click();
  };
  useEffect(() => {
    const loadFolders = async () => {
      try {
        const { data } = await supabase
          .from("folders")
          .select("* , notes(title, slug, id) folders(*)");
        data.forEach((folder) => {
          folder.children = folder.notes;
          folder.title = folder.name;
          delete folder.folders_notes;
        });
        const { data: root } = await supabase
          .from("notes")
          .select("title, slug, id, markdown")
          .is("folder_id", "null");

        data.forEach((folder) => {
          folder.children = folder.notes;
          folder.title = folder.name;
          delete folder.folders_notes;
        });
        root.forEach((r) => {
          r.name = r.title;
          r.type = "file";
        });
        // let { data: paths } = await supabase.storage.from("images").list();
        // let { data: signedUrls } = await supabase.storage
        //   .from("images")
        //   .createSignedUrls(
        //     paths.map((p) => p.name),
        //     60
        //   );
        // console.log(signedUrls);
        // const images = signedUrls.map((s) => {
        //   return { src: s.signedUrl, title: s.path, type: "img" };
        // });
        setFolders({
          title: "root",
          children: [...data, ...root],
        });
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
        .select("* ,notes(count)")
        .single();
      data.children = data.folders_notes.map(({ notes: note }) => {
        return { ...note };
      });
      data.title = data.name;
      data.children = [];
      setFolders({
        title: "root",
        children: [...folders.children, data],
      });
      setOpenNewFolder(false);
      toast.success("Folder '" + value + "' successfully created !");
    } catch (e) {
      console.log(e);
      toast.error("An error occured trying to create a new folder.");
    }
  };
  return (
    <Context.Provider
      value={{
        folders,
        tabs,
        setTabs,
        exportToMd,
        setOpenNewFolder,
        setOpenDeleteNote,
        openDeleteNote,
        setOpenSettingsModal,
      }}
    >
      {children}
      {user && (
        <Modal
          open={openNewFolder}
          setOpen={setOpenNewFolder}
          onCancel={() => setOpenNewFolder(false)}
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
      <SettingsModal open={openSettingsModal} setOpen={setOpenSettingsModal} />
    </Context.Provider>
  );
}
