const router = require('express').Router();
const authRouter = require('./auth');
const clientRouter = require('./clients');
const protectedRouter = require('./protected'); // Import the protected routes

router.use('/auth', authRouter);
router.use('/clients', clientRouter);
router.use('/protected', protectedRouter); // Use the protected routes

module.exports = router;