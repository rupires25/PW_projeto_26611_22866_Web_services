const authRouter = require('express').Router();
const controller = require('../../controllers/v2/auth');

authRouter.post('/signin', controller.signin);
authRouter.post('/signup', controller.signup);
authRouter.post('/letoken', controller.readToken);


module.exports = authRouter;