import { catchError } from '../utils/error.util.js';
import { logger } from '../utils/logger.util.js';

export const httpLogMiddleware = catchError(async (req, res, next) => {
  res.on('finish', () => {
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode}`;

    logger.http(logMessage);
  });

  next();
});
