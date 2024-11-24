const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name must not exceed 50 characters"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["startup", "investor", "admin"],
        message: "Role must be one of 'startup', 'investor', or 'admin'",
      },
    },
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description must not exceed 500 characters"],
    },
    avatar: {
      type: String,
      default: "",
      match: [
        /^(https?:\/\/|\/uploads\/)/,
        "Avatar must be a valid URL or a valid path to the uploaded file",
      ],
    },
  },
  {
    timestamps: true, // Добавляет поля createdAt и updatedAt
  }
);

// Метод для проверки пароля
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Хэширование пароля перед сохранением
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Создаем и экспортируем модель пользователя
const User = mongoose.model("User", userSchema);

module.exports = User;
