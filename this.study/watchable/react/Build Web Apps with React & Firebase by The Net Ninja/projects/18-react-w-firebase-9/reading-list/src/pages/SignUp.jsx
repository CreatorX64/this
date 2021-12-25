import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, signUp } = useSignUp();

  function handleSubmit(event) {
    event.preventDefault();
    signUp(email, password);
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input
            required
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            required
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </label>
        <button>Sign up</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
