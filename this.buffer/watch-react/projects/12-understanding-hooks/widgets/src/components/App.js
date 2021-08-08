import React from "react";
import Accordion from "./Accordion";

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

const App = () =>
{
  return (
    <div>
      <br />
      <Accordion items={items} />
    </div>
  );
};

export default App;