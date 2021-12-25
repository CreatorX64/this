import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, login } = useLogin();

  async function handleSubmit(event) {
    event.preventDefault();
    await login(email, password);
  }

  return (
    <div>
      <h2>Login</h2>
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
        <button>Log in</button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
