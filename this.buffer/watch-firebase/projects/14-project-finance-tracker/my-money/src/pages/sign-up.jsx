import { useState } from "react";
import { useSignUp } from "@/hooks/sign-up";
import styles from "@/pages/sign-up.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { signUp, isPending, error } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, displayName);
  };

  return (
    <form className={styles.signUpForm} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

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

      {isPending ? (
        <button disabled type="button" className="btn">
          Loading...
        </button>
      ) : (
        <button type="submit" className="btn">
          Sign Up
        </button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUp;
