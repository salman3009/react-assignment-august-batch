const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const checkAuth = require('../middleware/authcheck');

router.get('',checkAuth,productController.getlist);
router.post('',productController.newList);
router.get('/admin',productController.getlist);


module.exports = router;