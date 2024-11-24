import React, { useState } from "react";
import { registerUser, loginUser } from "../../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // состояние для имени
  const [role, setRole] = useState("investor"); // состояние для роли
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // Обработка логина
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password);
      console.log("Logged in with token:", token);
      localStorage.setItem("authToken", token); // Сохраняем токен в localStorage
      // Переход на страницу профиля
      // navigate("/profile"); // например, если используете react-router
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // Обработка регистрации
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(email, password, name, role);
      const { token } = response;
      localStorage.setItem("authToken", token); // Сохраняем токен в localStorage
      // Переход на страницу профиля
      // navigate("/profile"); // например, если используете react-router
    } catch (error) {
      setError("Error registering user: " + error.message);
    }
  };

  return (
    <div>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      {error && <p>{error}</p>}
      <form onSubmit={isRegister ? handleRegister : handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="investor">Investor</option>
              <option value="startuper">Startuper</option>
            </select>
          </>
        )}
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default LoginPage;
