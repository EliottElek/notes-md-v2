import React, { useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { IoCopyOutline } from "react-icons/io5";
import { Tooltip } from "@material-tailwind/react";
const CopyToClipBoard = ({ textRef }) => {
  const [copied, setCopied] = useState(false);

  //function to copy to clipboard
  const copyToClipBoard = () => {
    if (textRef.current !== null && textRef.current.textContent !== null) {
      navigator.clipboard.writeText(textRef.current.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <Tooltip
      animate={{
        mount: { scale: 1, y: 0.7 },
        unmount: { scale: 0, y: 0 },
      }}
      className="bg-gray-700"
      content={
        copied ? (
          <span className="flex gap-1">
            Copied <CheckIcon className="h-5 w-5" />
          </span>
        ) : (
          <span>Copy content</span>
        )
      }
      placement="left"
    >
      <button
        className="text-gray-200 h-6 w-6 absolute top-2 right-2"
        onClick={copyToClipBoard}
      >
        <IoCopyOutline className="text-gray-200 h-5 w-5 opacity-30 hover:opacity-100 duration-75" />
      </button>
    </Tooltip>
  );
};

const Pre = ({ children }) => {
  const textInput = useRef(null);
  return (
    <pre className="rounded-lg my-2 mt-4 relative" ref={textInput}>
      {children}
      <CopyToClipBoard textRef={textInput} />
    </pre>
  );
};

export default Pre;
