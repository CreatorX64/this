import { FC, useState } from "react";
import { List } from "./components/List";
import { AddToList } from "./components/AddToList";
import { Person } from "./models/Person";
import "./App.css";

interface IState {
  people: Person[];
}

export const App: FC = () => {
  const [people, setPeople] = useState<IState["people"]>([
    {
      name: "Lebron James",
      url: "https://images-na.ssl-images-amazon.com/images/I/519f8CbN8vL._SX450_.jpg",
      age: 36,
      note: "Allergic to staying on the same team"
    }
  ]);

  return (
    <div className="App">
      <h1>People Invited to my Party</h1>
      <List people={people} />
      <AddToList people={people} setPeople={setPeople} />
    </div>
  );
};
