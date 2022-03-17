import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "@restart/ui/esm/Button";
import { Form } from "react-bootstrap";

const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $name: String!
    $bio: String!
  ) {
    signUp(
      credentials: { email: $email, password: $password }
      name: $name
      bio: $bio
    ) {
      userErrors {
        message
      }
      token
    }
  }
`;

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [signUp, { data }] = useMutation(SIGN_UP);
  const navigate = useNavigate();

  const handleClick = () => {
    signUp({
      variables: {
        email,
        password,
        name,
        bio
      }
    });
  };

  useEffect(() => {
    if (data) {
      if (data.signUp.userErrors.length > 0) {
        setError(data.signUp.userErrors[0].message);
      } else if (data.signUp.token) {
        localStorage.setItem("token", data.signUp.token);
        navigate("/");
      }
    }
  }, [data, navigate]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signup</Button>
      </Form>
    </div>
  );
};
