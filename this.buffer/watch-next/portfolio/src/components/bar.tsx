import type { FC } from "react";
import { ISkill } from "../types";

interface IProps {
  data: ISkill;
}

const Bar: FC<IProps> = ({ data: { name, level, Icon } }) => {
  return (
    <div className="my-2 rounded-full text-white bg-gray-300 dark:bg-dark-300">
      <div
        className="flex items-center rounded-full px-4 py-1 bg-gradient-to-r from-green to-blue-600"
        style={{ width: `${level}%` }}
      >
        <Icon className="mr-3" />
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Bar;
