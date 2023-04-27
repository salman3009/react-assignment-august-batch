const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const authMiddleware = require('../middleware/auth');

//router level middleware
router.use((req,res,next)=>{
    console.log("router level 2");
    next();
})

router.get('',authMiddleware,productController.getListController);
router.post('',productController.postListController);


module.exports = router;