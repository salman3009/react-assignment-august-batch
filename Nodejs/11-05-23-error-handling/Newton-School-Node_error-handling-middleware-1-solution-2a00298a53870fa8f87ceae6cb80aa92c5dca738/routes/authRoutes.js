const express = require("express");

const {
    login, signup, decodeToken, logout
} = require("../controllers/authControllers");

const protectRouteAdmin = require('../middlewares/protectRouteAdmin');


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Add a middleware to protect admin routes
router.get('/decode', protectRouteAdmin ,decodeToken)

module.exports = router;