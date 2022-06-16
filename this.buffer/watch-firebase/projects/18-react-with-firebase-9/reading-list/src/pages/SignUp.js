import { useState } from "react";

import useSignUp from "hooks/useSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorMessage, signUp } = useSignUp();

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp(email, password);
  };

  return (
    <div>
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button>Sign Up</button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignUp;
