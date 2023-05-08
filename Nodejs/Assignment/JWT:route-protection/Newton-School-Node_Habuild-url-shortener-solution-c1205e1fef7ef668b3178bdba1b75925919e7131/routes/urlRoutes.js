const express = require("express");
const router = express.Router();

const {
  shortenUrl,
  updateUrl,
  getDestinationUrl,
  updateExpiry,
} = require("../controllers/urlController");

// Shorten URL
router.post("/shorten", shortenUrl);

// Update short URL
router.put("/update", updateUrl);

// Get destination URL
router.get("/:shortUrl", getDestinationUrl);

// Update expiry
router.put("/expire", updateExpiry);

module.exports = router;
