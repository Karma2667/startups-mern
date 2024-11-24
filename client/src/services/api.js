// src/services/api.js
import axios from "axios";

// Базовая настройка axios
const api = axios.create({
  baseURL: "http://localhost:5000", // URL вашего backend сервера
  timeout: 10000, // Таймаут запроса
});

export default api;
