// middleware/authenticateToken.js
const jwt = require("jsonwebtoken");
const config = require("../config");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Берем токен из заголовков

  if (!token) return res.sendStatus(403); // Если токен отсутствует, запрещаем доступ

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // Если токен не валиден, запрещаем доступ
    req.user = user; // Сохраняем данные пользователя из токена
    next(); // Переходим к следующему обработчику
  });
};

module.exports = authenticateToken;
