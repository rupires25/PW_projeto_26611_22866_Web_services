const router = require('express').Router();
const clientRouter = require('./clients');

router.use('/clients', clientRouter);

module.exports = router;
