// config.js
require("dotenv").config(); // Подключаем dotenv, чтобы читать из .env

const config = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/StartupsBD", // Используем переменную из .env или дефолтное значение
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret", // Секрет для JWT
  port: process.env.PORT || 5000, // Порт для сервера
  clientURL: process.env.CLIENT_URL || "http://localhost:3000", // URL для фронтенда
};

module.exports = config;
