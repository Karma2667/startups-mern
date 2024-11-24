import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import HomePage from "./pages/HomePage/HomePage";
import StartupsPage from "./pages/StartupsPage/StartupsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ChatsPage from "./pages/ChatsPage/ChatsPage"; // Импортируем страницу чатов

function App() {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Проверка авторизации

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/startups" element={<StartupsPage />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Новый маршрут для страницы чатов */}
        <Route
          path="/chats"
          element={isAuthenticated ? <ChatsPage /> : <Navigate to="/login" />}
        />
        {/* Пример маршрута для чата по ID */}
        <Route
          path="/chats/:chatId"
          element={isAuthenticated ? <ChatsPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
