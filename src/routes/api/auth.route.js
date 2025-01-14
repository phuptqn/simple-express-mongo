import express from 'express';

import * as authController from '../../controllers/auth.controller.js';
import { validatorMiddleware } from '../../middlewares/validator.middleware.js';
import { loginSchema, refreshTokenSchema, registerSchema } from '../../validations/auth.validation.js';

const authRouter = express.Router();
authRouter.post('/login', validatorMiddleware(loginSchema), authController.login);
authRouter.post('/refresh-token', validatorMiddleware(refreshTokenSchema), authController.refreshToken);
authRouter.post('/register', validatorMiddleware(registerSchema), authController.register);

const meRouter = express.Router();
meRouter.get('/me', authController.getMe);

export { authRouter, meRouter };
