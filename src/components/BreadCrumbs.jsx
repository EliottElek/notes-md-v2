import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Breads({ links }) {
  return (
    <Breadcrumbs className="bg-transparent text-md">
      <Link to="/">
        <span className="dark:text-white">root</span>
      </Link>
      {links?.map((link, i) => (
        <Link key={i} to={link?.href}>
          <span className="dark:text-white">{link?.label}</span>
        </Link>
      ))}
    </Breadcrumbs>
  );
}
