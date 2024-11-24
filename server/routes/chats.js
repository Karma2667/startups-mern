// routes/chats.js
const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat"); // Модель чатов
const User = require("../models/User"); // Модель пользователя

// Маршрут для получения всех чатов пользователя
router.get("/all", async (req, res) => {
  try {
    const userId = req.user.id; // Получаем userId из токена, который мы установили в authenticateToken middleware

    // Ищем все чаты, где присутствует пользователь
    const chats = await Chat.find({ users: { $in: [userId] } }).populate(
      "users",
      "name avatar"
    );

    if (!chats) {
      return res.status(404).json({ message: "Чаты не найдены" });
    }

    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
