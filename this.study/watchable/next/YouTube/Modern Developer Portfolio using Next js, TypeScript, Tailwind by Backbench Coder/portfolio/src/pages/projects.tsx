import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import type { Category, IProject } from "../types";
import { projects } from "../data";
import ProjectCard from "../components/project-card";
import ProjectsNavbar from "../components/projects-navbar";
import { fadeInUp, routeFadeIn, stagger } from "../animations";

const ProjectsPage: NextPage = () => {
  const [filterProjects, setFilterProjects] = useState<IProject[]>(projects);
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [showDetail, setShowDetail] = useState<number | null>(null);

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
    <>
      <Head>
        <title>Web Developer | Projects | Hakan</title>
      </Head>

      <motion.div
        className="h-[65vh] overflow-y-scroll px-5 py-2"
        variants={routeFadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <ProjectsNavbar
          activeCategory={activeCategory}
          onFilter={handleFilterCategory}
        />

        <motion.div
          className="relative grid grid-cols-12 gap-4 my-3"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {filterProjects.map((project) => (
            <motion.div
              key={project.name}
              className="col-span-12 p-2 sm:col-span-6 lg:col-span-4"
              variants={fadeInUp}
            >
              <ProjectCard
                project={project}
                showDetail={showDetail}
                setShowDetail={setShowDetail}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProjectsPage;
