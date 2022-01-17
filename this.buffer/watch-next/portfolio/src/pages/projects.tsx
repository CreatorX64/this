import type { NextPage } from "next";
import { useState } from "react";
import type { Category, IProject } from "../types";
import { projects } from "../data";
import ProjectCard from "../components/project-card";
import ProjectsNavbar from "../components/projects-navbar";

const ProjectsPage: NextPage = () => {
  const [filterProjects, setFilterProjects] = useState<IProject[]>(projects);
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const handleFilterCategory = (category: Category | "all"): void => {
    if (category === "all") {
      setFilterProjects(projects);
      setActiveCategory("all");
      return;
    }

    setFilterProjects(
      projects.filter((project) => project.categories.includes(category))
    );
    setActiveCategory(category);
  };

  return (
    <div className="h-[65vh] overflow-y-scroll px-5 py-2">
      <ProjectsNavbar
        activeCategory={activeCategory}
        onFilter={handleFilterCategory}
      />

      <div className="relative grid grid-cols-12 gap-4 my-3">
        {filterProjects.map((project) => (
          <div
            key={project.name}
            className="col-span-12 p-2 sm:col-span-6 lg:col-span-4"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
