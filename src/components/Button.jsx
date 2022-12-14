import React from "react";

const Button = (props) => {
  if (props.deletebtn)
    return (
      <button
        {...props}
        type="button"
        className="items-center gap-1 dark:text-red-400 text-red-500 flex bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        {props.children}
      </button>
    );

  if (props.defaultbtn)
    return (
      <button
        {...props}
        type="button"
        className="text-gray-900 items-center flex gap-1  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      ></button>
    );

  return (
    <button
      {...props}
      type="button"
      className="text-white bg-green-700 items-center flex gap-1 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
    ></button>
  );
};

export default Button;
