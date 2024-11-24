// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const authRoutes = require("./routes/auth"); // Подключаем роуты

const app = express();

// Подключение к MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключаем маршруты авторизации
app.use("/api/auth", authRoutes); // Подключаем роуты

// Запуск сервера
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
