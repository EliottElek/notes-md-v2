import React, { useContext, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Context from "./Context";
import { Tooltip } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";

export const Tab = ({ tab }) => {
  const { slug } = useParams();
  const { setTabs, tabs, currentNote } = useContext(Context);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleRemove = () => {
    const tabFoundIntex = tabs.findIndex((tb) => tb.id === tab.id);
    if (tabFoundIntex === -1) return;
    const copy = [...tabs];
    copy.splice(tabFoundIntex, 1);
    setTabs([...copy]);
    if (copy.length === 0) {
      navigate("/");
    }
    if (slug === tab.slug) {
      const index =
        tabFoundIntex - 1 < 0 ? tabFoundIntex + 1 : tabFoundIntex - 1;
      if (!tabs[index].slug) navigate("/");
      navigate("/notes/" + tabs[index]?.slug);
    }
  };
  return (
    <div
      className={[
        "flex mt-1 z-0 relative  h-9 border-t border-l border-r border-transparent hover:bg-gray-300 dark:hover:bg-blue-gray-700 rounded-t items-center gap-3 p-1 w-[175px] justify-between text-gray-700 dark:text-gray-200",
        slug === tab.slug &&
          "bg-gray-50 border-gray-400 border-opacity-50 dark:border-blue-gray-500 dark:bg-blue-gray-700 hover:bg-gray-50",
      ].join(" ")}
    >
      <Link
        to={"/notes/" + tab?.slug}
        className={[
          "w-full px-3 truncate !text-ellipsis",
        ].join(" ")}
      >
        {tab?.title}
      </Link>

      <Tooltip
        placement="bottom"
        content="Close"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 1 },
        }}
      >
        <button
          onClick={currentNote?.saved ? handleRemove : () => setOpen(true)}
          className="dark:hover:bg-blue-gray-900 hover:bg-gray-400 rounded"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </Tooltip>
      <Modal
        onCancel={() => setOpen(false)}
        onValidate={() => handleRemove()}
        open={open}
        setOpen={setOpen}
        title="Before leaving"
      >
        <p>It seems like you did not save your work here.</p>
      </Modal>
    </div>
  );
};

const Tabs = ({ children }) => {
  return (
    <div className="sticky z-10 max-w-full overflow-auto scroll-m-0 scrollbar-hide  border-gray-300 dark:border-gray-800 top-0  flex text-slate-400 text-md leading-6 bg-gray-200 dark:bg-blue-gray-900">
      {children}
    </div>
  );
};

export default Tabs;
