// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import HomePage from "./pages/HomePage/HomePage";
import StartupsPage from "./pages/StartupsPage/StartupsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  const profileData = {
    history: [
      { title: "Investment 1", description: "Invested in Startup A" },
      { title: "Investment 2", description: "Invested in Startup B" },
      // Добавьте больше элементов истории по мере необходимости
    ],
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/startups" element={<StartupsPage />} />
        <Route path="/profile" element={<ProfilePage {...profileData} />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
