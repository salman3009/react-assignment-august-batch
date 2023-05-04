const router = require('express').Router();

router.use('/students/', require('./studentRoutes'));

module.exports = router;
