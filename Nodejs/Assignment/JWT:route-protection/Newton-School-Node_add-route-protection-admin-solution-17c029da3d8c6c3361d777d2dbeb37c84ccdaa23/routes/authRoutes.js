const express = require("express");

const {
    login, signup, decodeToken
} = require("../controllers/authControllers");

const protectRouteAdmin = require('../middlewares/protectRouteAdmin');


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Add a middleware to protect admin routes
router.get('/decode', protectRouteAdmin ,decodeToken)

module.exports = router;