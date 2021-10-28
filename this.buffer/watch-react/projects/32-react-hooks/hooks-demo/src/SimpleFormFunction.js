import { useState } from "react";

export default function SimpleFormFunction() {
  const [email, setEmail] = useState("");

  function handleChange(event) {
    setEmail(event.target.value);
  }

  return (
    <div>
      <h1>The value is... {email}</h1>
      <input type="text" value={email} onChange={handleChange} />
      <button onClick={() => setEmail("")}>Submit</button>
    </div>
  );
}
