const URL = require("../models/Url");

// Shorten URL
const shortenUrl = async (req, res) => {
  const { destinationUrl, expiresAt } = req.body;
  const url = new URL({
    destinationUrl,
    expiresAt,
  });
  await url.save();
  res.json({
    shortUrl: url.shortUrl,
  });
};

// Update short URL
const updateUrl = async (req, res) => {
  const { shortUrl, destinationUrl } = req.body;
  const url = await URL.findOne({ destinationUrl });
  const url_short = await URL.findOne({ shortUrl });
  if (url_short) {
    return res.status(409).json({ message: "shortUrl already exists" });
  }
  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }
  url.shortUrl = shortUrl;
  await url.save();
  res.json({
    success: true,
  });
};

// Get destination URL
const getDestinationUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const url = await URL.findOne({ shortUrl });
  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }
  res.redirect(url.destinationUrl);
};

// Update expiry
const updateExpiry = async (req, res) => {
  const { shortUrl, days } = req.body;
  const url = await URL.findOne({ shortUrl });
  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }
  url.expiresAt.setDate(url.expiresAt.getDate() + days);
  await url.save();
  res.json({
    success: true,
  });
};

module.exports = {
  shortenUrl,
  updateUrl,
  getDestinationUrl,
  updateExpiry,
};
