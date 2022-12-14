import React from "react";
import ReactMarkdown from "react-markdown";
import Pre from "./Pre";
import rehypeHighlight from "rehype-highlight";
const components = {
  pre: Pre,
  a: (props) => (
    <a className="underline" {...props}>
      {props.children}
    </a>
  ),
};
const Mdx = ({ mdContent }) => {
  if (!mdContent) return;
  return (
    <div className="text-left">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={components}>
        {mdContent}
      </ReactMarkdown>
    </div>
  );
};
export default Mdx;
