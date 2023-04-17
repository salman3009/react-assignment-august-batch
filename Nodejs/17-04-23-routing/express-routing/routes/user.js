const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/register',userController.registration);
router.post('/login',userController.login);


module.exports = router;