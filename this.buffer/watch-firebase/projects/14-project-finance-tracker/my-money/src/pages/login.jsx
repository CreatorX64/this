import { useState } from "react";
import { useLogin } from "@/hooks/login";
import styles from "@/pages/login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2>Login</h2>

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
        <button disabled type="button" className="btn">
          Loading...
        </button>
      ) : (
        <button type="submit" className="btn">
          Login
        </button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
