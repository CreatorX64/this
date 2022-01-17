import type { FC } from "react";
import { IService } from "../types";

interface IProps {
  service: IService;
}

const ServiceCard: FC<IProps> = ({ service: { title, about, Icon } }) => {
  return (
    <div className="flex items-center space-x-4 p-2">
      <Icon className="w-12 h-12 text-green" />
      <div>
        <h4 className="font-bold">{title}</h4>
        <p dangerouslySetInnerHTML={{ __html: about }} />
      </div>
    </div>
  );
};

export default ServiceCard;
