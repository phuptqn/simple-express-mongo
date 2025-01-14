import { catchError, UnprocessableError } from '../utils/error.util.js';
import { validate } from '../validations/index.js';

const validationErrorMessageKey = 'validationError';

export const validatorMiddleware = (schema, customData) =>
  catchError(async (req, _res, next) => {
    const needValidatingData = customData || req.body;
    if (!needValidatingData) {
      throw new UnprocessableError(validationErrorMessageKey);
    }

    const { error, data } = validate(schema, needValidatingData);
    if (error) {
      throw new UnprocessableError(validationErrorMessageKey, error);
    }

    req.body = !customData ? data : req.body;

    next();
  });
