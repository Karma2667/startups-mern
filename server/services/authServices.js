const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Модель пользователя

const user = await User.findOne({ email: "admin2@gmail.com" });
console.log("Stored password hash:", user.password); // Хеш пароля
const isMatch = await bcrypt.compare("admin2", user.password); // Вводимый пароль
console.log("Password match:", isMatch);

// Регистрация пользователя
const registerUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed password: ${hashedPassword}`); // Лог хешированного пароля

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error during registration" });
  }
};
// Логин пользователя
// Логин пользователя
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Хешируем введенный пароль и сравниваем с тем, что в базе данных
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Генерация JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = { registerUser, loginUser };
