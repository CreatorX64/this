import { useState } from "react";

export default function Clock({ name }) {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Hello, {name}</h1>
      <h2>It is {date.toLocaleTimeString()}</h2>
    </div>
  );
}
