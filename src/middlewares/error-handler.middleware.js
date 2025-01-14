import { config } from '../configs/config.js';
import { RequestError } from '../utils/error.util.js';
import { HttpResponse } from '../utils/http-response.util.js';
import { logger } from '../utils/logger.util.js';

export const errorHandlerMiddleware = async (error, _req, res, next) => {
  if (!error) return next();

  const requestError = !(error instanceof RequestError) ? new RequestError('serverError', 500) : error;

  let errorDetail = error.errorDetail;

  if (requestError.statusCode >= 500) {
    logger.error(error);
    logger.debug(error.stack);

    errorDetail = !errorDetail && config.isDev && error.stack ? error.stack : null;
  }

  return HttpResponse.error(res, requestError.statusCode, requestError.messageCode, errorDetail);
};
