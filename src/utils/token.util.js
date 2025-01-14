import jwt from 'jsonwebtoken';

import { config } from '../configs/config.js';
import { logger } from '../utils/logger.util.js';

const { accessTokenSecret, accessTokenExpiresIn, refreshTokenSecret, refreshTokenExpiresIn } = config.jwt;

export const createJwtToken = (jsonData, tokenType = 'access') => {
  let secret = accessTokenSecret;
  let expiresIn = accessTokenExpiresIn;

  if (tokenType === 'refresh') {
    secret = refreshTokenSecret;
    expiresIn = refreshTokenExpiresIn;
  }

  return jwt.sign(jsonData, secret, {
    expiresIn,
  });
};

export const verifyJwtToken = (token, tokenType = 'access') => {
  const secret = tokenType === 'refresh' ? refreshTokenSecret : accessTokenSecret;

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    logger.debug(err);
    return null;
  }
};
