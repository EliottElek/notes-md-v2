import { XMarkIcon } from "@heroicons/react/24/outline";
import * as React from "react";
export default function ContextMenu({ children, content, tabIndex }) {
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  const onBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      handleClose();
    }
  };
  return (
    <div
      tabIndex={tabIndex}
      onContextMenu={handleContextMenu}
      className="h-full w-full"
    >
      {children}
      {contextMenu && (
        <div
          onBlur={onBlur}
          style={{
            zIndex: 100,
            position: "absolute",
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
          }}
        >
          <div
            onBlur={onBlur}
            class="bg-white w-60 pt-6 border border-gray-300 rounded-lg flex flex-col text-sm py-2 px-2 text-gray-500 shadow-lg relative"
          >
            <button
              onClick={handleClose}
              className="absolute top-1 right-1 h-6  w-6 text-gray-500"
            >
              <XMarkIcon />
            </button>
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
