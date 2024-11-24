import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // состояние для имени
  const [role, setRole] = useState("investor"); // состояние для роли
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  // Обработка логина
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("authToken", token); // Сохраняем токен в localStorage
      navigate("/profile"); // Переход на страницу профиля
    } catch (error) {
      setError("Invalid email or password"); // Ошибка при логине
    }
  };

  // Обработка регистрации
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password, name, role }
      );
      const { token } = response.data;
      localStorage.setItem("authToken", token); // Сохраняем токен в localStorage
      navigate("/profile"); // Переход на страницу профиля
    } catch (error) {
      setError(
        "Error registering user: " +
          (error.response?.data?.message || error.message)
      ); // Ошибка при регистрации
    }
  };

  // Переключение между формами логина и регистрации
  const handleToggle = () => {
    setIsRegister(!isRegister);
    setError(""); // очищаем ошибку при переключении форм
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} className="d-flex justify-content-center">
          <Form onSubmit={isRegister ? handleRegister : handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {isRegister && (
              <>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="investor">Investor</option>
                    <option value="startuper">Startuper</option>
                  </Form.Control>
                </Form.Group>
              </>
            )}
            {error && <p className="text-danger">{error}</p>}
            <Button variant="primary" type="submit">
              {isRegister ? "Register" : "Login"}
            </Button>
            <Button variant="secondary" onClick={handleToggle} className="ms-2">
              {isRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
