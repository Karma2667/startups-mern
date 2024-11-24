// src/services/userService.js
import axios from "./api";

// Получение данных пользователя
export const getUserData = async () => {
  try {
    const response = await axios.get("/api/user", {
      headers: {
        Authorization: localStorage.getItem("token"), // Отправка токена
      },
    });
    return response.data; // Успех
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Обновление данных пользователя
export const updateUserData = async (userData) => {
  try {
    const response = await axios.put("/api/user", userData, {
      headers: {
        Authorization: localStorage.getItem("token"), // Отправка токена
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
