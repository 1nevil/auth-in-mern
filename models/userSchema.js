const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
});
module.exports = mongoose.model("user", userSchema);
