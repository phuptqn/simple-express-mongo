import mongoose from 'mongoose';

import { config } from '../../src/configs/config.js';
import { ERROR_CODE_PREFIX } from '../../src/configs/constants.js';
import { User } from '../../src/models/user.model.js';
import { createJwtToken } from '../../src/utils/token.util.js';

export const AUTH_USER = {
  name: 'phupt',
  password: '123',
};

export class TestUtil {
  static apiEndpoint(path) {
    return `${config.app.apiPrefix}/${path}`;
  }

  static genObjectId() {
    return new mongoose.Types.ObjectId();
  }

  static genErrorCode(code) {
    const returnCode = code
      .replace(/\./g, '-')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toUpperCase();

    return `${ERROR_CODE_PREFIX}${returnCode}`;
  }

  static async createAuthUser() {
    const user = new User(AUTH_USER);

    const accessToken = createJwtToken({ userId: user._id });
    const refreshToken = createJwtToken({ userId: user._id }, 'refresh');

    user.refreshToken = refreshToken;
    await user.save();

    return {
      ...user.toObject(),
      accessToken,
    };
  }
}
