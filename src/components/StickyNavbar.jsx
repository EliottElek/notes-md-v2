import React from "react";
import useDarkMode from "../lib/useDarkMode";
import { BsGithub, BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
const StickyNavbar = ({ children }) => {
  const [colorTheme, setTheme] = useDarkMode();
  const { user, signOut } = useAuth();

  return (
    <div className="sticky z-10 p-3 md:px-10  px-5 top-0 left-0 right-0 flex items-center dark:bg-slate-700 bg-gray-100 border-b dark:border-b-slate-600 justify-between">
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
        <a
          href="https://github.com/eliottelek/notes-md-v2"
          rel="noreferrer"
          target="_blank"
          className="flex items-center text-2xl gap-2 dark:text-gray-100 px-3 py-2 rounded-lg cursor-pointer dark:hover:text-green-500 hover:text-green-500 ease-in duration-100"
        >
          <BsGithub />
        </a>
        <Menu className="z-20">
          <MenuHandler>
            <h6 className = "cursor-pointer">{user?.user_metadata?.preferred_username}</h6>
          </MenuHandler>
          <MenuList className="z-20">
            <MenuItem className = "cursor-pointer" onClick={signOut}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default StickyNavbar;
