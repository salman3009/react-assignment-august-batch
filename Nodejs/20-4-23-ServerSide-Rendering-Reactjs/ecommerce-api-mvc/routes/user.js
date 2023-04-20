const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('',userController.registerDetails);
router.post('',userController.loginDetails);

module.exports = router;