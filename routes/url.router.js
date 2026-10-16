const express = require("express");
const router = express.Router();
const {
  generateShortId,
  redirectToOriginalUrl,
  getAnalytics,
} = require("../controllers/url.controller.js");

//get analytics for a short URL -> number of visits/clicks
router.get("/analytics/:shortId", getAnalytics);
//redirect to the original URL
router.get("/:shortId", redirectToOriginalUrl);

//generate a new short URLs
router.post("/", generateShortId);

module.exports = router;
