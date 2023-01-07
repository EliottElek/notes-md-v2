import React from "react";
import Modal from "./Modal";
import {
  Switch,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const SettingsModal = ({ open, setOpen }) => {
  const { user } = useAuth();
  const data = [
    {
      label: "General",
      value: "general",
      desc: (
        <div>
          <h4>General</h4>
          <div className="flex w-full border-t pt-3 border-t-gray-300 justify-between gap-4 items-center">
            <p>Ask me when I want to delete a file/folder</p>
            <Switch color="green" />
          </div>
        </div>
      ),
    },
    {
      label: "Account",
      value: "account",
      desc: (
        <div>
          <h4>Account</h4>
          <div className="flex w-full border-t pt-3 border-t-gray-300 justify-between gap-4 items-center">
            {user ? (
              <p>Welcome to your files {user?.email}</p>
            ) : (
              <div>
                You don't seem to be logged in.
                <a href="/login" className="underline text-green-500 cursor-pointer">
                  {" "}
                  Login here
                </a>
              </div>
            )}
          </div>
        </div>
      ),
    },

    {
      label: "Theme",
      value: "theme",
      desc: `We're not always in the position that we want to be at.
            We're constantly growing. We're constantly making mistakes. We're 
            constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <Modal
      className="sm:max-w-4xl max-h-[70%] overflow-y-auto"
      open={open}
      setOpen={setOpen}
      onCancel={() => setOpen(false)}
      onValidate={() => {}}
      title={"Settings"}
    >
      <div className="flex flex-col gap-4 w-full">
        <Tabs className="flex " id="custom-animation" value="general">
          <TabsHeader className="flex flex-col w-[120px] p-0 bg-transparent">
            {data.map(({ label, value }) => (
              <Tab
                className="w-full dark:text-gray-50 bg-red"
                key={value}
                value={value}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            className="max-w-full mt-0 p-0 m-0"
            animate={{
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            {data.map(({ value, desc }) => (
              <TabPanel className="p-4 m-0 mt-0 pt-0" key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </Modal>
  );
};

export default SettingsModal;
