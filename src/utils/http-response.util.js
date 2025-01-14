import { getErrorByCode } from './error.util.js';

class HttpResponse {
  static response(res, statusCode = 200, data = {}) {
    res.status(statusCode).json({
      success: true,
      data,
    });
  }

  static error(res, statusCode, errorCode, detail = null) {
    const errorData = getErrorByCode(res, errorCode);

    res.status(statusCode).json({
      success: false,
      error: {
        ...errorData,
        detail,
      },
    });
  }

  static ok(res, data = {}) {
    HttpResponse.response(res, 200, data);
  }

  static created(res, data = {}) {
    HttpResponse.response(res, 201, data);
  }
}

export { HttpResponse };
