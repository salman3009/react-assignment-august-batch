const router = require('express').Router();

router.use('/url', require('./urlRoutes'));

module.exports = router;
