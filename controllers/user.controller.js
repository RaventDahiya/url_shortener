const User = require("../models/user.models.js");
const { setUser } = require("../service/auth.js");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }
  await User.create({ name, email, password });
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email, password });
  if (!existingUser) {
    return res.render("login", { error: "Invalid email or password" });
  }
  const token = setUser(existingUser);
  // Store the session ID in a cookie or a database
  res.cookie("uid", token, { httpOnly: true });
  return res.redirect("/");
};

module.exports = { handleUserSignup, handleUserLogin };
