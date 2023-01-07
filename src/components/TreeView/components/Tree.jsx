import React, { useCallback } from "react";
import { Directory } from "./Directory";
import { FileIcon } from "../Icons/File";
import { Item } from "./Item";
import { useContextMenu } from "../context";

export const Tree = ({ root }) => {
  const { setShow, setPosition } = useContextMenu();

  const onContextMenu = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      const { currentTarget } = event;
      setShow(true);
      setPosition({
        x: currentTarget.offsetTop,
        y: currentTarget.offsetLeft + 40,
      });
    },
    [setShow, setPosition]
  );

  const onItemClicked = useCallback(
    (event) => {
      event.stopPropagation();
      setShow(false);
    },
    [setShow]
  );

  return (
    <ul className="menu border-l ml-3 bg-default border-l-gray-300 dark:border-gray-800 text-content-700">
      {root.children &&
        root.children.map((item) => {
          if (item.children)
            return (
              <Directory
                key={item.title}
                item={item}
                setShow={setShow}
                onContextMenu={onContextMenu}
              />
            );
          return (
            <Item
              key={item.title}
              onClick={onItemClicked}
              onContextMenu={onContextMenu}
              item={item}
              root={root}
            >
              <span className=" hover:bg-gray-100 hover:dark:bg-gray-800 transition block p-2 truncate">
                <FileIcon />
                {item.title}
              </span>
            </Item>
          );
        })}
    </ul>
  );
};
