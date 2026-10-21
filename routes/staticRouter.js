const express = require("express");
const router = express.Router();
const URL = require("../models/url.models.js");

router.get("/", async (req, res) => {
  const allURLs = await URL.find({});
  return res.render("home", { urls: allURLs });
});

router.get("/create", (req, res) => {
  return res.render("addURL");
});

module.exports = router;
