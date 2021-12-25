import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, error, login } = useLogin();

  function handleSubmit(evt) {
    evt.preventDefault();
    login(email, password);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        <span>Email</span>
        <input
          type="email"
          onChange={(evt) => setEmail(evt.target.value)}
          value={email}
          required
        />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          onChange={(evt) => setPassword(evt.target.value)}
          value={password}
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

      {error && <div className="error">{error}</div>}
    </form>
  );
}
