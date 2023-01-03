import React from "react";
import ReactMarkdown from "react-markdown";
import Pre from "./Pre";
import rehypeHighlight from "rehype-highlight";
import remarkMdx from "remark-mdx";
import remarkCodeTabs from "../lib/remark-code-tabs";
import remarkCustomParagraphs from "../lib/remark-custom-paragraphs";
import Tabs, { Tab } from "./Tabs";
import CustomParagraph from "./CustomParagraph";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

const components = {
  Tabs: Tabs,
  Tab: Tab,
  CustomParagraph: (props) => {
    console.log(props);
    return <CustomParagraph {...props} title="jzjz" />;
  },
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
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
        remarkPlugins={[
          remarkCustomParagraphs,
          remarkMdx,
          remarkCodeTabs,
          remarkGfm,
          remarkMath,
        ]}
        components={components}
      >
        {mdContent}
      </ReactMarkdown>
    </div>
  );
};
export default Mdx;
