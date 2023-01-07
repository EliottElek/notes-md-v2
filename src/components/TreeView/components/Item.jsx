import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
export const Item = ({ children, item, root, ...rest }) => {
  const { slug } = useParams();
  return (
    <li
      className={[
        "cursor-pointer",
        slug && slug === item?.slug && "bg-gray-100 dark:bg-gray-800",
      ].join(" ")}
      {...rest}
    >
      {root ? (
        <Link to={`/notes/${item.slug}`}>
          {children}
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </li>
  );
};
