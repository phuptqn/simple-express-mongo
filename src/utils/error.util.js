import { t } from '../languages/index.js';
import { ERROR_CODE_PREFIX } from '../configs/constants.js';

export class RequestError extends Error {
  constructor(messageCode = 'badRequest', statusCode = 400, errorDetail = null) {
    super(messageCode);

    this.messageCode = messageCode;
    this.statusCode = statusCode;
    this.errorDetail = errorDetail;
  }
}

export class UnauthenticatedError extends RequestError {
  constructor(messageCode = 'unauthenticated', errorDetail = null) {
    super(messageCode, 401, errorDetail);
  }
}

export class ForbiddenError extends RequestError {
  constructor(messageCode = 'forbidden', errorDetail = null) {
    super(messageCode, 403, errorDetail);
  }
}

export class UnprocessableError extends RequestError {
  constructor(messageCode = 'unprocessable', errorDetail = null) {
    super(messageCode, 422, errorDetail);
  }
}

export const catchError = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const getErrorByCode = (res, code) => {
  const message = t(res, code);
  if (!message) return null;

  const returnCode = message.code
    ? message.code
    : code
        .replace(/\./g, '-')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toUpperCase();

  return {
    code: `${ERROR_CODE_PREFIX}${returnCode}`,
    message: message.message || message,
  };
};
