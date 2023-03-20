const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/onlineShopping")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("cant Connected to MongoDB", error));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  budget: Number,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
