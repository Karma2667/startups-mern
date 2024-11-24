import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Данные пользователя
  const [avatar, setAvatar] = useState(null); // Для загрузки аватарки
  const [description, setDescription] = useState(""); // Описание профиля
  const [editing, setEditing] = useState(false); // Режим редактирования
  const navigate = useNavigate();

  // Получение данных пользователя
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data); // Обновляем стейт с новыми данными
        setDescription(response.data.description || ""); // Устанавливаем описание
        setAvatar(response.data.avatar || ""); // Устанавливаем аватар (если он есть)
      } catch (err) {
        console.error(err);
        navigate("/login"); // Если ошибка, возвращаем на страницу логина
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      if (avatar) formData.append("avatar", avatar);
      formData.append("description", description);

      const response = await axios.put(
        "http://localhost:5000/api/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Обновленный профиль:", response.data); // Логируем обновленный профиль

      // Обновляем данные на фронте
      setUser({
        ...user,
        avatar: response.data.avatar || user.avatar, // Обновляем аватар
        description: response.data.description || user.description, // Обновляем описание
      });
      setEditing(false); // Выход из режима редактирования
    } catch (err) {
      console.error("Ошибка при обновлении профиля:", err);
      alert("Ошибка обновления профиля");
    }
  };

  // Создание или переход в чат
  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/chats/create",
        { recipientId: user.id },
        {
          headers: { Authorization: `Bearer ${token}` }, // Передача токена
        }
      );
      const { chatId } = response.data;
      navigate(`/chats/${chatId}`); // Переход в чат
    } catch (err) {
      console.error("Ошибка при создании чата:", err);
      alert("Ошибка при создании чата");
    }
  };

  // Выход из профиля
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Удаление токена из localStorage
    navigate("/login"); // Перенаправление на страницу логина
  };

  // Переход на страницу создания стартапа
  const handleCreateStartup = () => {
    navigate("/create-startup"); // Переход на страницу создания стартапа
  };

  // Убедимся, что профиль загружается
  if (!user) return <div>Загрузка профиля...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Профиль пользователя</h1>
      <div className="row">
        {/* Левая колонка: Аватарка, имя, описание, кнопка редактирования профиля и кнопка отправки сообщения */}
        <div className="col-md-6">
          <div className="d-flex flex-column align-items-start">
            {/* Аватарка и кнопка загрузки */}
            <div className="avatar-container mb-4">
              <img
                src={
                  user.avatar
                    ? `${user.avatar}?${new Date().getTime()}` // Добавляем уникальный параметр для предотвращения кэширования
                    : "https://via.placeholder.com/150/cccccc/ffffff?text=Avatar"
                }
                alt="Avatar"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              {editing && (
                <Form.Group className="mt-3">
                  <Form.Label>Загрузить аватарку</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </Form.Group>
              )}
            </div>

            {/* Имя пользователя и описание */}
            <div className="user-details mb-4">
              {editing ? (
                <div>
                  <h3>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="form-control"
                    />
                  </h3>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="form-control"
                  ></textarea>
                  <Button
                    variant="success"
                    onClick={handleProfileUpdate}
                    className="mt-3"
                  >
                    Сохранить изменения
                  </Button>
                </div>
              ) : (
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.description || "Описание отсутствует"}</p>
                  <Button variant="primary" onClick={() => setEditing(true)}>
                    Редактировать профиль
                  </Button>
                </div>
              )}
            </div>

            {/* Кнопка отправки сообщения */}
            <Button
              variant="secondary"
              onClick={handleSendMessage}
              className="mt-4"
            >
              Отправить сообщение
            </Button>

            {/* Кнопка выхода */}
            <Button variant="danger" onClick={handleLogout} className="mt-4">
              Выйти
            </Button>

            {/* Кнопка создания стартапа, показывается только если пользователь стартапер */}
            {user.isStartup && (
              <Button
                variant="success"
                onClick={handleCreateStartup}
                className="mt-4"
              >
                Создать стартап
              </Button>
            )}
          </div>
        </div>

        {/* Правая колонка: История инвестиций или стартапов */}
        <div className="col-md-6">
          <div>
            {user.investments && user.investments.length > 0 ? (
              <>
                <h2>История инвестиций</h2>
                <ul>
                  {user.investments.map((investment) => (
                    <li key={investment.id}>
                      {investment.projectName} — {investment.amount} USD
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2>История инвестиций</h2>
                <p>Инвестиций пока нет</p>
              </>
            )}
          </div>

          <div>
            {user.startups && user.startups.length > 0 ? (
              <>
                <h2>История стартапов</h2>
                <ul>
                  {user.startups.map((startup) => (
                    <li key={startup.id}>{startup.name}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2>История стартапов</h2>
                <p>Стартапы пока не созданы</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
