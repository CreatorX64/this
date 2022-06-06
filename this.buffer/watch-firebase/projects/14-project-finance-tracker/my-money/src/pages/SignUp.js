import { useState } from "react";

import styles from "styles/SignUp.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password, displayName });
  };

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

      <label>
        <span>Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label>
        <span>Display Name:</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>

      <button className="btn">Sign Up</button>
    </form>
  );
};

export default SignUp;
