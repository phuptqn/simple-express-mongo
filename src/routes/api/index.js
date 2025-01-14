import express from 'express';

import { authRouter, meRouter } from './auth.route.js';
import { userRouter } from './user.route.js';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware.js';

const router = express.Router();

router.get('/', (_req, res) => res.render('index', { message: 'nothing here' }));

const routers = [
  {
    path: '/',
    router: authRouter,
  },
  {
    path: '/',
    router: meRouter,
    middlewares: [authenticateMiddleware],
  },
  {
    path: '/users',
    router: userRouter,
    middlewares: [authenticateMiddleware],
  },
];

routers.forEach(({ path, router: _router, middlewares }) => {
  router.use(path, ...(middlewares || []), _router);
});

export const apiRouter = router;
