const express = require("express");

const {
    login, signup, decodeToken
} = require("../controllers/authControllers");


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get('/decode', decodeToken)

module.exports = router;