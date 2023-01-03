import cuid from "cuid";
import React from "react";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import { useAuth } from "../hooks/useAuth";

const ContextMenuCustom = ({ children, items }) => {
  const id = cuid();
  const { user } = useAuth();
  if (!user) return <div>{children}</div>;
  return (
    <div className="h-full w-full">
      <ContextMenuTrigger id={id}>{children}</ContextMenuTrigger>
      <ContextMenu id={id}>{items}</ContextMenu>
    </div>
  );
};

export default ContextMenuCustom;
