import React, { useState } from "react";
import useDarkMode from "../lib/useDarkMode";
import { BsGithub, BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Modal from "./Modal";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Button from "./Button";
const StickyNavbar = ({ children }) => {
  const [colorTheme, setTheme] = useDarkMode();
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <div className="sticky z-10 p-3 md:px-10  px-5 top-0 left-0 right-0 flex items-center dark:bg-gray-700 bg-gray-100 border-b dark:border-b-gray-600 justify-between">
      <div className="flex items-center gap-4 self-start">
        <Link to="/">
          <img className="h-12" src={logo} alt="md-notes" />
        </Link>
        <div className="flex-grow hidden md:flex items-center ">{children}</div>
      </div>
      <div className="flex items-center">
        {colorTheme === "light" ? (
          <button
            onClick={() => setTheme("light")}
            className="flex items-center text-2xl gap-2 dark:text-gray-100 px-3 py-2 rounded-lg cursor-pointer dark:hover:text-green-500 hover:text-green-500 ease-in duration-100"
          >
            <BsSun />
          </button>
        ) : (
          <button
            onClick={() => setTheme("dark")}
            className="flex items-center text-2xl gap-2 dark:text-gray-100 px-3 py-2 rounded-lg cursor-pointer dark:hover:text-green-500 hover:text-green-500 ease-in duration-100"
          >
            <FiMoon />
          </button>
        )}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center text-2xl gap-2 dark:text-gray-100 px-3 py-2 rounded-lg cursor-pointer dark:hover:text-green-500 hover:text-green-500 ease-in duration-100"
        >
          <BsGithub />
        </button>
        <Menu className="z-20">
          <MenuHandler>
            <h6 className="cursor-pointer">
              {user?.user_metadata?.preferred_username}
            </h6>
          </MenuHandler>
          <MenuList className="z-20">
            <MenuItem className="cursor-pointer" onClick={signOut}>
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <Modal open={open} setOpen={setOpen} displayOnly>
        <div className="flex flex-col items-center gap-8">
          <BsGithub className="dark:text-gray-100 h-12 w-12" />
          <div className="flex justify-center">
            <Link to={"/login"}>
              <Button>Login via github</Button>
            </Link>
            <a
              href="https://github.com/eliottelek/notes-md-v2"
              rel="noreferrer"
              target="_blank"
              className="flex items-center text-sm gap-2 dark:text-gray-100 px-3 rounded-lg cursor-pointer dark:hover:text-green-500 hover:text-green-500 ease-in duration-100"
            >
              <Button className="flex">
                View the code
              </Button>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StickyNavbar;
