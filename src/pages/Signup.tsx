import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const { signup, users } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const exists = users.some((u) => u.email === data.email);
    if (exists) {
      setError("Email already exists");
      return;
    }

    signup(data);
    navigate("/");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Sign Up</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...register("name", { required: "Name is required" })}
              />
              <Form.Text className="text-danger">
                {errors.name?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="success">
                Create Account
              </Button>
            </div>
          </Form>
          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/" className="text-primary">
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
