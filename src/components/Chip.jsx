import React from "react";

const Chip = ({ children, color }) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className={`px-3 text-xs text-gray-100 py-1 rounded-2xl`}
    >
      {children}
    </span>
  );
};

export default Chip;
