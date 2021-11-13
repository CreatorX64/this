import { ChangeEventHandler, FC, useState } from "react";

export enum HairColor {
  Blonde = "Your hair is blonde, good for you",
  Brown = "Cool hair color",
  Pink = "Wow that is so cool"
}

interface IProps {
  name: string;
  age: number;
  email: string;
  hairColor: HairColor;
}

type NameType = "Pedro" | "Jack" | "Manuel";

export const Person: FC<IProps> = ({ name, age, email, hairColor }) => {
  const [country, setCountry] = useState<string | null>(null);

  const nameForType: NameType = "Jack";

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{email}</p>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Write down your country..."
      />
      <p>{country}</p>
      <p>{hairColor}</p>
      <p>{nameForType}</p>
    </div>
  );
};
