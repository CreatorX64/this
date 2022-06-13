import { useState } from "react";

import useSignUp from "hooks/useSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signUp, isPending, errorMessage } = useSignUp();

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp(email, password, displayName, thumbnail);
  };

  const handleFileChange = (event) => {
    setThumbnail(null); // In case there was a previous selection

    let selected = event.target.files[0];

    // Validate file input
    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less than 100KB");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

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

      <label>
        <span>Display Name:</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </label>

      <label>
        <span>Profile Thumbnail:</span>
        <input type="file" onChange={handleFileChange} required />
        {thumbnailError && <p className="error">{thumbnailError}</p>}
      </label>

      {isPending ? (
        <button className="btn" disabled>
          Loading...
        </button>
      ) : (
        <button className="btn">Sign Up</button>
      )}

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default SignUp;
