import React, { useState } from "react";
import Accordion from "./Accordion";
import Dropdown from "./Dropdown";
import Header from "./Header";
import Search from "./Search";
import Route from "./Route";
import Translate from "./Translate";

const items =
[
  {
    title: "What is React?",
    content: "React is a frontend JavaScript library."
  },
  {
    title: "Why use React?",
    content: "React is a favorite JavaScript library among engineers."
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components."
  }
];

const options =
[
  {
    label: "Red",
    value: "red"
  },
  {
    label: "Green",
    value: "green"
  },
  {
    label: "Blue",
    value: "blue"
  }
];

const App = () =>
{
  const [selected, setSelected] = useState(options[0]);
  
  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          label="Select a Color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};

export default App;