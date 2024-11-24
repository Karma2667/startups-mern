// routes/profile.js
const express = require("express");
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken"); // Используйте ваш middleware для токенов
const router = express.Router();

// Получение данных профиля
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Получаем данные пользователя по ID из токена
    if (!user) return res.sendStatus(404); // Если пользователь не найден

    res.json({
      name: user.name,
      email: user.email,
      description: user.description || "",
      avatar: user.avatar || "", // Подразумевается, что у пользователя есть аватар
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" }); // Обработка ошибок
  }
});

module.exports = router;
