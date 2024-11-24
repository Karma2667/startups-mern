import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password }); // Логирование данных перед отправкой
    try {
      console.log("Logging in with:", { email, password }); // Логируем данные запроса
      const token = await loginUser(email, password);
      console.log("Received token:", token); // Логируем полученный токен
      localStorage.setItem("authToken", token); // Сохраняем токен
      console.log(localStorage.getItem("authToken"));
      console.log("Navigating to /profile");
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err); // Логируем ошибку
      setError(err?.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} lg={5} xl={4} className="mx-auto">
          {" "}
          {/* Центрируем столбец */}
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-100"
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-100"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
          </Form>
          <p className="text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-decoration-none">
              Register
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
