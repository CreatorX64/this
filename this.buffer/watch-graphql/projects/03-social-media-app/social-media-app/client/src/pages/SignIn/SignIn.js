import { gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import Button from "@restart/ui/esm/Button";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(credentials: { email: $email, password: $password }) {
      userErrors {
        message
      }
      token
    }
  }
`;

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [signIn, { data }] = useMutation(SIGN_IN);

  const handleClick = () => {
    signIn({
      variables: {
        email,
        password
      }
    });
  };

  useEffect(() => {
    if (data) {
      if (data.signIn.userErrors.length > 0) {
        setError(data.signIn.userErrors[0].message);
      } else if (data.signIn.token) {
        localStorage.setItem("token", data.signIn.token);
        navigate("/");
      }
    }
  }, [data, navigate]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}

        <Button onClick={handleClick}>Sign in</Button>
      </Form>
    </div>
  );
};
