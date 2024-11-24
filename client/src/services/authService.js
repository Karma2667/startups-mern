import axios from "axios";

// Функция для регистрации пользователя
export const registerUser = async (email, password, name, role) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        email,
        password,
        name,
        role,
      }
    );
    return response.data; // Возвращаем ответ с токеном
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Функция для логина пользователя
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    return response.data.token; // Возвращаем токен
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
