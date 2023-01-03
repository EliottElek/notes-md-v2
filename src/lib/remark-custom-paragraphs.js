import { visit } from "unist-util-visit";

export default function remarkCustomParagraphs() {
  return function (tree) {
    visit(tree, (node) => {
      if (node.type !== "mdxJsxFlowElement" && node.name !== "div") return;
      if (node.attributes.length === 0 && !node.attributes[0]) return;
      // We get the type of paragraph : warning, info, note...
      const types = ["warning", "caution", "info", "default", "success"];
      const type = node.attributes.find((attr) => attr.name === "type")?.value;
      if (!types.includes(type)) return;
      const title =
        node.attributes.find((attr) => attr.name === "title")?.value || type;
      console.log(node.name);
      node.name = "CustomParagraph";
      node.type = "mdxJsxFlowElement";
      node.attributes = [
        { type: "mdxJsxAttribute", name: "type", value: type },
        { type: "mdxJsxAttribute", name: "title", value: title },
      ];
      return node;
    });
  };
}
