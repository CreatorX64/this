import {
  ChangeEventHandler,
  Dispatch,
  FC,
  SetStateAction,
  useState
} from "react";
import { Person } from "../models/Person";

interface IProps {
  people: Person[];
  setPeople: Dispatch<SetStateAction<Person[]>>;
}

export const AddToList: FC<IProps> = ({ people, setPeople }) => {
  const [input, setInput] = useState({
    name: "",
    age: "",
    note: "",
    img: ""
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClick = (): void => {
    if (!input.name || !input.age || !input.img) {
      return;
    }

    setPeople((prevState) => [
      ...prevState,
      {
        name: input.name,
        age: Number(input.age),
        url: input.img,
        note: input.note
      }
    ]);

    setInput({
      name: "",
      age: "",
      note: "",
      img: ""
    });
  };

  return (
    <div className="AddToList">
      <input
        type="text"
        placeholder="Name"
        className="AddToList-input"
        name="name"
        value={input.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Age"
        className="AddToList-input"
        name="age"
        value={input.age}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Image URL"
        className="AddToList-input"
        name="img"
        value={input.img}
        onChange={handleChange}
      />
      <textarea
        placeholder="Notes"
        className="AddToList-input"
        name="note"
        value={input.note}
        onChange={handleChange}
      />
      <button className="AddToList-btn" onClick={handleClick}>
        Add to list
      </button>
    </div>
  );
};
