const express = require('express');
const router = express.Router();
const userController = require('../controller/user');


router.get('/registration',userController.registerNewUser);


module.exports = router;