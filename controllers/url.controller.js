const Url = require("../models/url.models.js");
const { nanoid } = require("nanoid");

const generateShortId = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  const shortId = nanoid(8);
  await Url.create({
    shortId,
    redirectUrl: originalUrl,
    visitHistory: [],
  });

  return res
    .status(201)
    .json({ message: `short id for ${originalUrl} is ${shortId}`, shortId });
};

const redirectToOriginalUrl = async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { returnDocument: "after" },
  );
  if (!url) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  return res.redirect(url.redirectUrl);
};

const getAnalytics = async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });
  if (!url) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  return res.status(200).json({ visitCount: url.visitHistory.length });
};

module.exports = {
  generateShortId,
  redirectToOriginalUrl,
  getAnalytics,
};
