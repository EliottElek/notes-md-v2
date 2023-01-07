import React from "react";
import { Tree } from "./components/Tree";
import { ContextMenu } from "./components/ContextMenu";
import { ContextMenuProvider } from "./context";

export default function TreeView({ data }) {
  return (
    <ContextMenuProvider>
      <ContextMenu />
      {data && <Tree root={data} />}
    </ContextMenuProvider>
  );
}
