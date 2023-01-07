import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TreeView from "../components/TreeView";
import Tabs, { Tab } from "../components/Tabs";
import Context from "../components/Context";
import { supabase } from "../lib/supabase";
import useDarkMode from "../lib/useDarkMode";
import { FiMoon } from "react-icons/fi";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  FolderPlusIcon,
  HomeIcon,
  PencilSquareIcon,
  SunIcon,
  CodeBracketIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";
export default function Layout({ children, data }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { tabs, setTabs, setOpenNewFolder, setOpenSettingsModal } =
    useContext(Context);
  const { slug } = useParams();
  const [colorTheme, setTheme] = useDarkMode();

  useEffect(() => {
    const loadNote = async () => {
      if (!slug) return;
      if (tabs.findIndex((tab) => tab.slug === slug) !== -1) return;
      const { data } = await supabase
        .from("notes")
        .select("title, id, slug, folder:folders(name, id)")
        .eq("slug", slug)
        .single();
      setTabs((prev) => [...prev, data]);
    };
    loadNote();
  }, [slug, setTabs, tabs]);
  return (
    <>
      <div>
        <div
          className={`flex ${
            sidebarOpen ? "w-64" : "w-12"
          } flex-col duration-300 z-20 fixed inset-y-0 border-r dark:border-gray-800 border-gray-300`}
        >
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-200 dark:bg-blue-gray-900">
            <div className="flex justify-end gap-1 items-center h-10 flex-shrink-0 px-4 bg-gray-200 dark:bg-blue-gray-900">
              {sidebarOpen ? (
                <div className="flex items-center">
                  <Tooltip
                    placement="bottom"
                    content="New folder"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <button
                      onClick={() => setOpenNewFolder(true)}
                      className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1"
                    >
                      <FolderPlusIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                    </button>
                  </Tooltip>
                  <Tooltip
                    placement="bottom"
                    content="New note"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <button className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1">
                      <PencilSquareIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                    </button>
                  </Tooltip>
                  <Tooltip
                    placement="bottom"
                    content={sidebarOpen ? "Collapse" : "Expand"}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1"
                    >
                      {sidebarOpen ? (
                        <ArrowsPointingInIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                      ) : (
                        <ArrowsPointingOutIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                      )}
                    </button>
                  </Tooltip>
                </div>
              ) : (
                <Tooltip
                  placement="right"
                  content={"Expand"}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <div className="flex items-center w-full justify-center p-1">
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1"
                    >
                      <ArrowsPointingOutIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                    </button>
                  </div>
                </Tooltip>
              )}
            </div>
            <div className="flex-1 flex overflow-y-auto border-t dark:border-gray-800 border-gray-300">
              <div className="h-full gap-1 w-12 -mr-3 p-2 flex flex-col items-center">
                <Tooltip
                  placement="right"
                  content={"Home"}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <button
                    onClick={() => navigate("/")}
                    className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1"
                  >
                    <HomeIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                  </button>
                </Tooltip>
                <div className="flex items-center">
                  <Tooltip
                    placement="right"
                    content={"Switch theme"}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    {colorTheme === "light" ? (
                      <button
                        onClick={() => setTheme("light")}
                        className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1"
                      >
                        <SunIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setTheme("dark")}
                        className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1"
                      >
                        <FiMoon className="h-4 w-4 font-thin text-gray-700 dark:text-gray-200" />
                      </button>
                    )}
                  </Tooltip>
                </div>
                <Tooltip
                  placement="right"
                  content={"Code infos"}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <button
                    onClick={() => navigate("/")}
                    className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1"
                  >
                    <CodeBracketIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                  </button>
                </Tooltip>
                <Tooltip
                  placement="right"
                  content={"Settings"}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <button
                    onClick={() => setOpenSettingsModal(true)}
                    className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md p-1"
                  >
                    <Cog8ToothIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                  </button>
                </Tooltip>
              </div>
              {sidebarOpen && (
                <div
                  className={`flex-1 flex flex-col overflow-y-auto dark:border-gray-800 border-gray-300`}
                >
                  <TreeView data={data} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            sidebarOpen ? "ml-64" : "ml-12"
          } flex duration-300  flex-col`}
        >
          {tabs && tabs.length > 0 && (
            <Tabs>
              {tabs.map((tab) => (
                <Tab tab={tab} key={tab.id} />
              ))}
            </Tabs>
          )}
          <main className="mt-2">{children}</main>
        </div>
      </div>
    </>
  );
}
