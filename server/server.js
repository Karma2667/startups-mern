// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const chatRoutes = require("./routes/chats");
const startupRoutes = require("./routes/startups");

const app = express();

// Подключение к MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // разрешаем доступ с этого адреса
    credentials: true,
  })
);
app.use(bodyParser.json());

// Подключаем маршруты
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes); // Подключаем роуты профиля
app.use("/api/chats", chatRoutes);
app.use("/api/startups", startupRoutes);
// В сервере Express добавьте эту строку
app.use("/uploads", express.static("uploads"));

// Запуск сервера
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
