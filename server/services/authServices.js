const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (email, password, name, role) => {
  try {
    // Проверка на существование пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role,
    });

    // Сохранение пользователя в базу данных
    const savedUser = await newUser.save();

    // Создание JWT токена
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Возвращение ответа с токеном
    return { message: "User registered successfully", token };
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Error during user registration");
  }
};

module.exports = { registerUser };
