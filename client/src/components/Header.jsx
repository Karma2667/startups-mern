import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken"); // Проверка авторизации

  // Функция для выхода
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Удаление токена из localStorage
    navigate("/login"); // Перенаправление на страницу логина
  };

  return (
    <nav
      className="fixed-top navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Startups
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {/* Пункт для чатов, показывается только если пользователь авторизован */}
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/chats">
                  Chats
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/startups">
                Startups
              </Link>
            </li>
            {/* Если пользователь авторизован, показываем ссылку на профиль, иначе - на страницу логина */}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
