const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/auth', require('./authRoutes'));

module.exports = router;
