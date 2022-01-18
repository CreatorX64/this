import Image from "next/image";
import { motion } from "framer-motion";
import type { Dispatch, FC, SetStateAction } from "react";
import { AiFillGithub, AiFillProject } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import type { IProject } from "../types";
import { fadeInUp, stagger } from "../animations";

interface IProps {
  project: IProject;
  showDetail: number | null;
  setShowDetail: Dispatch<SetStateAction<number | null>>;
}

const ProjectCard: FC<IProps> = ({
  project: {
    id,
    name,
    imagePath,
    deployedUrl,
    description,
    githubUrl,
    keyTechs
  },
  showDetail,
  setShowDetail
}) => {
  return (
    <div>
      {/* <img
        src={imagePath}
        alt={name}
        className="cursor-pointer"
        onClick={() => setShowDetail(true)}
      /> */}

      <Image
        src={imagePath}
        alt={name}
        className="cursor-pointer"
        onClick={() => setShowDetail(id)}
        width={300}
        height={150}
        layout="responsive"
      />

      <p className="my-2 text-center">{name}</p>

      {showDetail === id && (
        <div className="absolute top-0 left-0 z-10 grid gap-x-12 w-full h-auto rounded-lg p-8 pt-14 text-black bg-gray-100 dark:text-white dark:bg-dark-100 md:grid-cols-2">
          <motion.div variants={stagger} initial="initial" animate="animate">
            {/* <img src={imagePath} alt={name} /> */}

            <motion.div
              variants={fadeInUp}
              className="border-4 border-gray-100"
            >
              <Image
                src={imagePath}
                alt={name}
                width={300}
                height={150}
                layout="responsive"
              />
            </motion.div>

            <motion.div
              className="flex justify-center my-4 space-x-3"
              variants={fadeInUp}
            >
              <a
                href={githubUrl}
                className="flex items-center space-x-3 px-4 py-2 text-lg bg-gray-200 dark:bg-dark-200"
              >
                <AiFillGithub /> <span>GitHub</span>
              </a>
              <a
                href={deployedUrl}
                className="flex items-center space-x-3 px-4 py-2 text-lg bg-gray-200 dark:bg-dark-200"
              >
                <AiFillProject /> <span>Project</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.h2
              className="mb-3 text-xl font-medium md:text-2xl"
              variants={fadeInUp}
            >
              {name}
            </motion.h2>
            <motion.h3 className="mb-3 font-medium" variants={fadeInUp}>
              {description}
            </motion.h3>

            <motion.div
              className="flex flex-wrap mt-5 space-x-2 text-sm tracking-wider"
              variants={fadeInUp}
            >
              {keyTechs.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm my-1 px-2 py-1 bg-gray-200 dark:bg-dark-200"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <button
            onClick={() => setShowDetail(null)}
            className="absolute top-3 right-3 rounded-full p-1 bg-gray-200 dark:bg-dark-200 focus:outline-none"
          >
            <MdClose size={30} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
