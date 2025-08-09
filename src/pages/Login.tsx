import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const success = login(email.trim().toLowerCase(), password);
    if (success) {
      toast.success("Login successful");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
      toast.error("Login failed");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" size="lg" onClick={handleLogin}>
              Login
            </Button>
          </div>

          <p className="mt-3 text-center">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
