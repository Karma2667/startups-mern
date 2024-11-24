import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatsPage = () => {
  const [chats, setChats] = useState([]); // Список чатов
  const [loading, setLoading] = useState(true); // Статус загрузки
  const [error, setError] = useState(null); // Ошибка при загрузке
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/chats", {
          headers: { Authorization: `Bearer ${token}` }, // Передача токена
        });

        console.log("Chats fetched:", response.data); // Логируем полученные данные
        setChats(response.data); // Устанавливаем чаты
        setLoading(false); // Останавливаем загрузку
      } catch (err) {
        console.error(
          "Ошибка при получении чатов:",
          err.response || err.message
        );
        setError("Ошибка при загрузке чатов"); // Устанавливаем ошибку
        setLoading(false); // Останавливаем загрузку в случае ошибки
      }
    };

    fetchChats();
  }, [navigate]);

  if (loading) {
    return <div>Загрузка чатов...</div>; // Показываем индикатор загрузки
  }

  if (error) {
    return <div>{error}</div>; // Выводим ошибку, если она есть
  }

  if (chats.length === 0) {
    return <div>Чатов пока нет.</div>; // Если чатов нет, показываем текст
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Чаты</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <button
              onClick={() => navigate(`/chats/${chat.id}`)}
              className="btn btn-link"
            >
              Чат с {chat.participantName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatsPage;
