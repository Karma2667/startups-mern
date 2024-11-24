// src/services/startupService.js
import axios from "./api";

// Получение списка стартапов
export const getStartups = async () => {
  try {
    const response = await axios.get("/api/startups", {
      headers: {
        Authorization: localStorage.getItem("token"), // Отправка токена
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Добавление нового стартапа
export const addStartup = async (startupData) => {
  try {
    const response = await axios.post("/api/startups", startupData, {
      headers: {
        Authorization: localStorage.getItem("token"), // Отправка токена
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
