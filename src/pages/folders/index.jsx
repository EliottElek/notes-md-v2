import React, { useContext } from "react";
import Context from "../../components/Context";
import Loader from "../../components/Loader";
import Folder from "../../components/Folder";
import Note from "../../components/Note";

const Folders = () => {
  const { folders, setFolders } = useContext(Context);

  return (
    <div className="folder__grid">
      {!folders ? (
        <div className="flex justify-center mt-10 items-center ">
          <Loader />
        </div>
      ) : (
        folders?.children.map((item) => {
          if (item.type === "file") return <Note note={item} key={item.id} />;
          else if (item.type === "img")
            return (
              <img
                alt={item.src}
                className="mini_mdx object-contain"
                src={item.src}
              />
            );
          return (
            <Folder
              setFolders={setFolders}
              folders={folders}
              key={item.id}
              folder={item}
            />
          );
        })
      )}
    </div>
  );
};

export default Folders;
