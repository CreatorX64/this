import { useState } from "react";

import useLogin from "hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, errorMessage } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      {isPending ? (
        <button className="btn" disabled>
          Loading...
        </button>
      ) : (
        <button className="btn">Login</button>
      )}

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default Login;
