import { useState } from "react";
import { useSignUp } from "../../hooks/useSIgnUp";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState(null);
  const { signUp, isPending, error } = useSignUp();

  function handleSubmit(evt) {
    evt.preventDefault();
    signUp(email, password, displayName, avatar);
  }

  function handleFileChange(evt) {
    setAvatar(null); // In case user selected something before
    const selectedFile = evt.target.files[0];

    console.log(selectedFile);

    if (!selectedFile) {
      setAvatarError("Please select a file");
      return;
    } else if (!selectedFile.type.includes("image")) {
      setAvatarError("Selected file must be an image");
      return;
    } else if (selectedFile.size > 100_000) {
      setAvatarError("Image file size must be less than 100kb");
      return;
    }

    setAvatarError(null); // In case user got an error before
    setAvatar(selectedFile);

    console.log("Avatar updated");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

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

      <label>
        <span>Display name</span>
        <input
          type="text"
          onChange={(evt) => setDisplayName(evt.target.value)}
          value={displayName}
          required
        />
      </label>

      <label>
        <span>Avatar</span>
        <input type="file" onChange={handleFileChange} required />
        {avatarError && <div className="error">{avatarError}</div>}
      </label>

      {isPending ? (
        <button className="btn" disabled>
          Loading...
        </button>
      ) : (
        <button className="btn">Sign up</button>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
}
