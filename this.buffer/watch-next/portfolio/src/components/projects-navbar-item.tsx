import type { FC } from "react";
import type { Category } from "../types";

interface IProps {
  value: Category | "all";
  activeCategory: Category | "all";
  onFilter: (category: Category | "all") => void;
}

const ProjectsNavbarItem: FC<IProps> = ({
  value,
  activeCategory,
  onFilter
}) => {
  let className = "capitalize cursor-pointer hover:text-green";

  if (activeCategory === value) {
    className += " text-green";
  }

  return (
    <li className={className} onClick={() => onFilter(value)}>
      {value}
    </li>
  );
};

export default ProjectsNavbarItem;
