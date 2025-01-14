import path from 'path';

const {
  PORT = 3000,
  NODE_ENV = 'development',
  MONGODB_URL,
  API_PREFIX = '/api',
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN = '15m',
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN = '7d',
  LOGGING_MAX_FILES = '3d',
  STORAGE_UPLOAD_DIR = 'storage',
  REQUEST_LIMIT_PER_MIN = 10,
} = process.env;

const envConfig = {
  development: {},
  production: {},
  test: {},
};

const mainConfig = {
  isDev: NODE_ENV === 'development',
  app: {
    env: NODE_ENV,
    port: Number(PORT),
    apiPrefix: API_PREFIX,
  },
  system: {
    requestLimitPerMin: REQUEST_LIMIT_PER_MIN,
  },
  jwt: {
    accessTokenSecret: JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
  database: {
    connectionUrl: MONGODB_URL,
  },
  logging: {
    maxFiles: LOGGING_MAX_FILES,
  },
  storage: {
    uploadDir: path.resolve(STORAGE_UPLOAD_DIR),
  },
};

export const config = Object.assign(mainConfig, envConfig[NODE_ENV]);
