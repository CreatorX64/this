import { useState } from "react";

import useLogin from "hooks/useLogin";
import styles from "styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h1>Login</h1>

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

      {isPending ? (
        <button className="btn" disabled>
          Loading...
        </button>
      ) : (
        <button className="btn">Login</button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
