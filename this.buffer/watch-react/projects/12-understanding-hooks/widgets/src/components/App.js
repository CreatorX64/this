import React, { useState } from "react";
// import Accordion from "./Accordion";
// import Search from "./Search";
import Dropdown from "./Dropdown";

// const items =
// [
//   {
//     title: "What is React?",
//     content: "React is a frontend JavaScript library."
//   },
//   {
//     title: "Why use React?",
//     content: "React is a favorite JavaScript library among engineers."
//   },
//   {
//     title: "How do you use React?",
//     content: "You use React by creating components."
//   }
// ];

const options =
[
  {
    label: "The Color Red",
    value: "red"
  },
  {
    label: "The Color Green",
    value: "green"
  },
  {
    label: "A Shade of Blue",
    value: "blue"
  }
];

const App = () =>
{
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        Toggle Dropdown
      </button>
      {showDropdown ?
        <Dropdown
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
        :
        null}
    </div>
  );
};

export default App;