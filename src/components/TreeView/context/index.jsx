import React, { createContext, useContext, useState } from "react";

const ContextMenuContext = createContext({});

export function ContextMenuProvider(props) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <ContextMenuContext.Provider
      value={{
        position,
        show,
        setShow: (s) => setShow(s),
        setPosition: ({ x, y }) => setPosition({ x: x, y: y }),
      }}
    >
      {props.children}
    </ContextMenuContext.Provider>
  );
}

export const useContextMenu = () => {
  return useContext(ContextMenuContext);
};
