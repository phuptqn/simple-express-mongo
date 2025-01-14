import express from 'express';
import { rateLimit } from 'express-rate-limit';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import { router } from './routes/index.js';
import { httpLogMiddleware } from './middlewares/http-log.middleware.js';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js';
import { config } from './configs/config.js';

const app = express();

app.use(
  bodyParser.json({
    limit: '100kb',
  }),
);

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 5 * config.system.requestLimitPerMin,
    message: 'Too many requests, please try again later.',
  }),
);

// Secure headers
app.use(helmet());

app.use((req, res, next) => {
  res.locals.lang = req.headers['app-lang'] || 'en';
  next();
});

app.use(httpLogMiddleware);

app.set('views', 'src/views');
app.set('view engine', 'ejs');

router(app);

app.use(errorHandlerMiddleware);

export { app };
