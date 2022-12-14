import React from "react";

const TextInput = (props) => {
  return (
    <input
      {...props}
      class="block w-full text-gray-700 flex-1 p-2 my-2 rounded-md border-gray-300 focus:outline-none focus:border-green-500 focus:ring-green-500 sm:text-sm"
    />
  );
};

export default TextInput;
