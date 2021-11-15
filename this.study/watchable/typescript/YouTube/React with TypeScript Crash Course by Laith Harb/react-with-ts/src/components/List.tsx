import { FC } from "react";
import { Person } from "../models/Person";

interface IProps {
  people: Person[];
}

export const List: FC<IProps> = ({ people }) => {
  const renderList = (): JSX.Element[] => {
    return people.map((person) => (
      <li key={person.name} className="List">
        <div className="List-header">
          <img
            className="List-img"
            src={person.url}
            alt={`Portrait shot of ${person.name}`}
          />
          <h2>{person.name}</h2>
        </div>
        <p>{person.age} years old</p>
        <p className="List-note">{person.note}</p>
      </li>
    ));
  };

  return <ul>{renderList()}</ul>;
};
