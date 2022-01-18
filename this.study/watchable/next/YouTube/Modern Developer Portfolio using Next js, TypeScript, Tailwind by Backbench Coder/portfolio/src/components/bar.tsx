import { motion } from "framer-motion";
import type { FC } from "react";
import { ISkill } from "../types";

interface IProps {
  data: ISkill;
}

const Bar: FC<IProps> = ({ data: { name, level, Icon } }) => {
  const barWidth = `${level}%`;
  const variants = {
    initial: {
      width: "max-content"
    },
    animate: {
      width: barWidth,
      transition: {
        duration: 0.4,
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <div className="my-2 rounded-full text-white bg-gray-300 dark:bg-dark-300">
      <motion.div
        className="flex items-center rounded-full px-4 py-1 bg-gradient-to-r from-green to-blue-600"
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <Icon className="mr-3" />
        <p className="whitespace-nowrap">{name}</p>
      </motion.div>
    </div>
  );
};

export default Bar;
