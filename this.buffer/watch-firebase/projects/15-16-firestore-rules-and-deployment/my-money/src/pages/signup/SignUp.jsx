import { useState } from "react";
import { useSignUp } from "../../hooks/useSIgnUp";
import styles from "./SignUp.module.css";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { isPending, error, signUp } = useSignUp();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    signUp(email, password, displayName);
  };

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Email</span>
        <input
          type="email"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          onChange={(evt) => setPassword(evt.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Display name</span>
        <input
          type="text"
          onChange={(evt) => setDisplayName(evt.target.value)}
          value={displayName}
        />
      </label>

      {isPending ? (
        <button className="btn" disabled>
          Loading...
        </button>
      ) : (
        <button className="btn">Sign up</button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
};
