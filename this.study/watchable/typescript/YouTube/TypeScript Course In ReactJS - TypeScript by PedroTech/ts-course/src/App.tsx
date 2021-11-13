import { FC, createContext } from "react";
import { Person, HairColor } from "./components/Person";
import "./App.css";

interface IAppContext {
  name: string;
  age: number;
  country: string;
}

const AppContext = createContext<IAppContext | null>(null);

export const App: FC = () => {
  const contextValue: IAppContext = {
    name: "Pedro",
    age: 20,
    country: "Brazil"
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <h1>App</h1>
        <Person
          name="Pedro"
          age={20}
          email="pedro@gmail.com"
          hairColor={HairColor.Brown}
        />
      </div>
    </AppContext.Provider>
  );
};
