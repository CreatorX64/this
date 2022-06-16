import { useState } from "react";

import useLogin from "hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorMessage, login } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <h2>Login</h2>

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

        <button>Login</button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
