import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Данные пользователя
  const [avatar, setAvatar] = useState(null); // Для загрузки аватарки
  const [description, setDescription] = useState(""); // Описание профиля
  const [editing, setEditing] = useState(false); // Режим редактирования
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true, // Авторизация через токен или куки
        });

        setUser(response.data);
        setDescription(response.data.description || "");
      } catch (err) {
        console.error(err);
        navigate("/login"); // Если пользователь не авторизован
      }
    };

    fetchUserData();
  }, [navigate]);

  // Обновление профиля
  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      if (avatar) formData.append("avatar", avatar);
      formData.append("description", description);

      const response = await axios.put(
        "http://localhost:5000/api/profile/update",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUser(response.data); // Обновление данных на странице
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Ошибка обновления профиля");
    }
  };

  // Создание или переход в чат
  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/chats/create",
        { recipientId: user.id },
        { withCredentials: true }
      );
      const { chatId } = response.data;
      navigate(`/chats/${chatId}`); // Переход в чат
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании чата");
    }
  };

  if (!user) return <div>Загрузка профиля...</div>;

  return (
    <div className="container mt-5">
      <h1>Профиль пользователя</h1>
      <div className="profile-info">
        <img
          src={user.avatar || "default-avatar.png"}
          alt="Avatar"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
        {editing ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              cols="50"
              placeholder="Введите описание"
            ></textarea>
            <button className="btn btn-success" onClick={handleProfileUpdate}>
              Сохранить изменения
            </button>
          </>
        ) : (
          <>
            <h3>{user.name}</h3>
            <p>{user.description || "Описание отсутствует"}</p>
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Редактировать профиль
            </button>
          </>
        )}
      </div>
      <div className="profile-history mt-5">
        <h2>История инвестиций</h2>
        {user.investments && user.investments.length > 0 ? (
          <ul>
            {user.investments.map((investment) => (
              <li key={investment.id}>
                {investment.projectName} — {investment.amount} USD
              </li>
            ))}
          </ul>
        ) : (
          <p>Инвестиций пока нет</p>
        )}
        <h2>Стартапы</h2>
        {user.startups && user.startups.length > 0 ? (
          <ul>
            {user.startups.map((startup) => (
              <li key={startup.id}>{startup.name}</li>
            ))}
          </ul>
        ) : (
          <p>Стартапы пока не созданы</p>
        )}
      </div>
      <button className="btn btn-secondary mt-3" onClick={handleSendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default ProfilePage;
