import { Transition } from "@headlessui/react";
import React, { useCallback, useState } from "react";
import { DirectoryIcon } from "../Icons/Directory";
import { Item } from "./Item";
import { Tree } from "./Tree";

export const Directory = ({ item, onContextMenu, setShow }) => {
  const [toggle, setToggle] = useState(false);
  const onItemClicked = useCallback(
    (event) => {
      event.stopPropagation();
      setToggle(!toggle);
      setShow(false);
    },
    [setShow, toggle]
  );
  return (
    <Item onClick={onItemClicked} onContextMenu={onContextMenu}>
      <span className=" hover:bg-gray-100 dark:hover:bg-gray-800 transition block pl-2 p-2 truncate">
        <DirectoryIcon open={toggle} />
        {item.title}
      </span>
      <Transition
        show={toggle}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Tree root={item} />
      </Transition>
    </Item>
  );
};
