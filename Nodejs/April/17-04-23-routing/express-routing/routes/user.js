const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.use((req,res,next)=>{
  console.log("Time",new Date());
  next();
})

router.get('/register',userController.registration);
router.post('/login',userController.login);


module.exports = router;