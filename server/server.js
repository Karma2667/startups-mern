// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const authService = require("./services/authServices"); // Подключаем сервис

const app = express();

// Подключение к MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Эндпоинт для регистрации пользователя
app.post("/api/auth/register", async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    console.log("Received registration request:", req.body);
    const response = await authService.registerUser(
      email,
      password,
      name,
      role
    );
    console.log("Registration successful:", response);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: error.message });
  }
});

// Эндпоинт для логина
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await authService.loginUser(email, password);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Эндпоинт для проверки авторизации
app.get("/api/check-auth", async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const response = await authService.checkAuth(token);
    res.json(response);
  } catch (error) {
    res.status(401).json({ isAuthenticated: false });
  }
});

// Запуск сервера
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
