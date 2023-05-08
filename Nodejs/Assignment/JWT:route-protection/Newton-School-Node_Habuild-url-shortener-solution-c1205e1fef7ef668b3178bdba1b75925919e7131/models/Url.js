const mongoose = require('mongoose');
const shortid = require("shortid");

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        default: shortid.generate,
    },
    destinationUrl: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

// Define URL model based on schema
const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
