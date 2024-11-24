// routes/profile.js
const express = require("express");
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();
const multer = require("multer");

// Получение данных профиля
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.sendStatus(404); // Если пользователь не найден

    res.json({
      name: user.name,
      email: user.email,
      description: user.description || "",
      avatar: user.avatar || "",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Конфигурация multer для обработки файлов
const upload = multer({ dest: "uploads/" });

router.put(
  "/",
  authenticateToken,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.sendStatus(404);

      // Обновление имени и описания
      if (req.body.name) user.name = req.body.name;
      if (req.body.description) user.description = req.body.description;

      // Обработка аватара
      if (req.file) {
        const avatarPath = `uploads/${req.file.filename}`;
        console.log("Путь к аватару:", avatarPath); // Логируем путь
        user.avatar = avatarPath; // Сохраняем путь к аватару в базе данных
      }

      await user.save();

      // Возвращаем обновленные данные с полным путем к изображению
      res.json({
        name: user.name,
        email: user.email,
        description: user.description || "",
        avatar: `http://localhost:5000/${user.avatar}` || "", // Добавляем базовый URL к пути
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
module.exports = router;
