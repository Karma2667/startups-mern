const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Связь с пользователем (стартапером)
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Путь к изображению стартапа
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Startup = mongoose.model("Startup", startupSchema);

module.exports = Startup;
