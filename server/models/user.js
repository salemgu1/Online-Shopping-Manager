const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://abdallahabukhdair:3A8o3Xa9isjMTmzd@cluster0.uvh8ikk.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("cant Connected to MongoDB", error));


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  budget: Number,
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
