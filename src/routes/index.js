import { config } from '../configs/config.js';
import { apiRouter } from './api/index.js';

export const router = (app) => {
  // API routes
  app.use(config.app.apiPrefix, apiRouter);

  app.get('/', (_req, res) => res.render('index', { message: 'it works!' }));
};
