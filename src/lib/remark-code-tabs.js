import { visit } from "unist-util-visit";

function renderTabs(tabs, nodes) {
  // Initiate the array of tabs we are going to insert
  let tabNodes = [];

  // We first insert <Tabs></Tabs>
  tabNodes.push({
    type: "mdxJsxFlowElement",
    name: "Tabs",
    attributes: [],
    children: [],
  });

  // Then for each tab, we insert <Tab label = {name}>{children}</Tab> as a child of <Tabs></Tabs>
  tabs.forEach((tab) => {
    const node = nodes[tab.start];
    const label = node.meta;
    // We get the name from the meta
    tabNodes[0].children.push({
      type: "mdxJsxFlowElement",
      name: "Tab",
      attributes: [{ type: "mdxJsxAttribute", name: "label", value: label }],
      // The children are the node
      children: [node],
    });
  });

  return tabNodes;
}
function findTabs(index, parent) {
  // Initiate the array
  const tabs = [];
  let tab;
  // Set start at index -1 because we loop for ++index
  index = index - 1;
  // From the position of the child we found the tab, we loop to see every next child
  while (++index < parent.children.length) {
    if (
      !parent.children[index + 1] ||
      parent.children[index + 1].type !== "code" ||
      !parent.children[index + 1].meta
    )
      // If we cannot find any other child that is a code and has a name,
      // We add enTab property to say that the previous child was the last one
      parent.children[index].endTab = true;

    // Then we add this tab to the array
    tab = {};
    tab.start = index;
    tab.end = parent.children.length;
    tabs.push(tab);
    if (parent.children[index].endTab) {
      tab.end = index + 1;
      break;
    }
  }
  // Finally we return the tab array
  return tabs;
}

export default function remarkCodeTabs() {
  return function (tree) {
    visit(tree, (node, index, parent) => {
      // We look for code blocks, and check if a name exists
      if (node.type !== "code" || !node.meta) return;
      // (node.meta is the name)
      // Then we check if the next item is a code tab and follows the same attributes
      if (
        !parent.children[index + 1] ||
        parent.children[index + 1].type !== "code" ||
        !parent.children[index + 1].meta
      )
        return;
      // If we have at least two elements that are code tabs and have names
      // Then we can find every other code blocks by calling findTabs
      const tabs = findTabs(index, parent);
      console.log(node);

      if (tabs.length > 0) {
        // We get the start index of the first element
        const start = tabs[0].start;
        // We get the end index of the last element
        const end = tabs[tabs.length - 1].end;
        // Then we call renderTabs() to insert our Tabs component
        const newChildren = renderTabs(tabs, parent.children);
        // Then we modify the tree to add tabs
        parent.children.splice(start, end - start, ...newChildren);
      }
    });
  };
}
