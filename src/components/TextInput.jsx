import React from "react";

const TextInput = (props) => {
  return (
    <input
      {...props}
      className={[
        props.className,
        "block w-full text-gray-700 bg-transparent dark:text-gray-50 flex-1 py-2 my-2 rounded-md border-gray-300 dark:border-gray-800 focus:outline-none focus:border-green-500 focus:ring-green-500",
      ].join(" ")}
    />
  );
};

export default TextInput;
