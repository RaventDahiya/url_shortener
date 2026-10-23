const express = require("express");
const router = express.Router();
const URL = require("../models/url.models.js");

router.get("/", async (req, res) => {
  if (!req.user) {
    return res.render("login", { urls: [] });
  }
  const allURLs = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allURLs });
});

router.get("/create", (req, res) => {
  return res.render("addURL");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login", { error: null });
});

module.exports = router;
