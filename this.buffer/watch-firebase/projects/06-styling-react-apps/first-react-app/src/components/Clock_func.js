import { useState } from "react";

const Clock = ({ name }) => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>It is {date.toLocaleTimeString()}</p>
    </div>
  );
};

export default Clock;
