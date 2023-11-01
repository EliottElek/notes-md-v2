import React, { useCallback } from "react";
import { Directory } from "./Directory";
import { FileIcon } from "../Icons/File";
import { Item } from "./Item";
import { useContextMenu } from "../context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    <DragDropContext
      onDragEnd={(param) => {
        const srcI = param.source.index;
        const desI = param.destination?.index;
        if (desI) {
          root.children.splice(desI, 0, root.children.splice(srcI, 1)[0]);
          root.children.saveList(root.children);
        }
      }}
    >
      <Droppable droppableId="droppable-1">
        {(provided, _) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ul className="menu border-l ml-3 bg-default border-l-gray-300 dark:border-gray-800 text-content-700">
              {root.children &&
                root.children.map((item, i) => {
                  if (item.children)
                    return (
                      <Draggable
                        onClick={(e) => e.stopPropagation()}
                        key={item.id}
                        draggableId={"draggable-" + item.id}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Directory
                              onClick={(e) => e.stopPropagation()}
                              key={item.title}
                              item={item}
                              setShow={setShow}
                              onContextMenu={onContextMenu}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  return (
                    <Draggable
                      onClick={(e) => e.stopPropagation()}
                      key={item.id}
                      draggableId={"draggable-" + item.id}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Item
                            key={item.title}
                            onClick={(e) => {
                              e.stopPropagation();
                              onItemClicked();
                            }}
                            onContextMenu={onContextMenu}
                            item={item}
                            root={root}
                          >
                            <span className="items-center$ hover:bg-gray-100 hover:dark:bg-gray-800 transition block p-1.5 truncate">
                              <FileIcon />
                              {item.title}
                            </span>
                          </Item>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
