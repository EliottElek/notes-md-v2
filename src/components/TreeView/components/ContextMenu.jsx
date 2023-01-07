import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContextMenu } from "../context";

export const ContextMenu = () => {
  const { show, setShow, position } = useContextMenu();

  useEffect(() => {
    const closeMenu = (event) => {
      event.stopPropagation();
      setShow(false);
    };

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  });

  const style = {
    top: position.x,
    left: position.y,
  };

  return show ? (
    <div
      style={style}
      className="origin-top-right absolute left-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div className="py-1" role="menu">
        <Link
          to={"/folders/1/new"}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          new note
        </Link>
      </div>
    </div>
  ) : null;
};
