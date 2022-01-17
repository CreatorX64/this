import { FC, useState } from "react";
import { AiFillGithub, AiFillProject } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import type { IProject } from "../types";

interface IProps {
  project: IProject;
}

const ProjectCard: FC<IProps> = ({
  project: {
    name,
    imagePath,
    categories,
    deployedUrl,
    description,
    githubUrl,
    keyTechs
  }
}) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  return (
    <div>
      <img
        src={imagePath}
        alt={name}
        className="cursor-pointer"
        onClick={() => setShowDetail(true)}
      />
      <p className="my-2 text-center">{name}</p>

      {showDetail && (
        <div className="absolute top-0 left-0 z-10 grid gap-x-12 w-full h-auto p-2 text-black bg-gray-100 dark:text-white dark:bg-dark-100 md:grid-cols-2">
          <div>
            <img src={imagePath} alt={name} />

            <div className="flex justify-center my-4 space-x-3">
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
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-medium md:text-2xl">{name}</h2>
            <h3 className="mb-3 font-medium">{description}</h3>

            <div className="flex flex-wrap mt-5 space-x-2 text-sm tracking-wider">
              {keyTechs.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm my-1 px-2 py-1 bg-gray-200 dark:bg-dark-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowDetail(false)}
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
