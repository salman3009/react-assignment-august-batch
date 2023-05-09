const express = require('express');
const router = express.Router();
const {profile} = require('../controllers/user');
const {verifyAuthToken} = require('../middlewares/auth');

router.get("/profile",verifyAuthToken,profile);


module.exports = router;