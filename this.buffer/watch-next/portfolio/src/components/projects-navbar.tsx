import type { FC } from "react";
import type { Category } from "../types";
import ProjectsNavbarItem from "./projects-navbar-item";

interface IProps {
  activeCategory: Category | "all";
  onFilter: (category: Category | "all") => void;
}

const ProjectsNavbar: FC<IProps> = ({ onFilter, activeCategory }) => {
  return (
    <div className="flex space-x-3 overflow-x-auto px-3 py-2 list-none">
      <ProjectsNavbarItem
        value="all"
        activeCategory={activeCategory}
        onFilter={onFilter}
      />
      <ProjectsNavbarItem
        value="react"
        activeCategory={activeCategory}
        onFilter={onFilter}
      />
      <ProjectsNavbarItem
        value="mongo"
        activeCategory={activeCategory}
        onFilter={onFilter}
      />
      <ProjectsNavbarItem
        value="django"
        activeCategory={activeCategory}
        onFilter={onFilter}
      />
      <ProjectsNavbarItem
        value="node"
        activeCategory={activeCategory}
        onFilter={onFilter}
      />
    </div>
  );
};

export default ProjectsNavbar;
