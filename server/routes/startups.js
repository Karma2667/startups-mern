const express = require("express");
const Startup = require("../models/Startup");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();
const multer = require("multer");

// Конфигурация multer для обработки файлов
const upload = multer({ dest: "uploads/" });

// Роут для создания стартапа
router.post(
  "/create",
  authenticateToken, // Проверка авторизации пользователя
  upload.single("image"), // Обработка изображения
  async (req, res) => {
    try {
      const { name, description } = req.body;
      const userId = req.user.id; // Получаем id пользователя из токена

      // Проверка обязательных данных
      if (!name || !description) {
        return res
          .status(400)
          .json({ message: "Name and description are required." });
      }

      // Сохраняем путь к изображению, если оно было загружено
      const imagePath = req.file ? `uploads/${req.file.filename}` : "";

      // Создаем новый стартап
      const newStartup = new Startup({
        userId,
        name,
        description,
        image: imagePath,
      });

      await newStartup.save();

      // Возвращаем информацию о созданном стартапе
      res.status(201).json({
        message: "Startup created successfully",
        startup: newStartup,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
// Роут для получения всех стартапов
router.get("/", async (req, res) => {
  try {
    const startups = await Startup.find();
    console.log("Стартапы из базы данных:", startups);
    res.status(200).json(startups); // Успешный ответ с массивом стартапов
  } catch (err) {
    console.error("Ошибка на сервере при получении стартапов:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
