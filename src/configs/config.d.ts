type Config = {
  isDev: boolean;
  app: {
    env: string;
    port: number;
    apiPrefix: string;
  };
  system: {
    requestLimitPerMin: number;
  };
  jwt: {
    accessTokenSecret: string;
    accessTokenExpiresIn: string;
    refreshTokenSecret: string;
    refreshTokenExpiresIn: string;
  };
  database: {
    connectionUrl: string;
  };
  logging: {
    maxFiles: string;
  };
  storage: {
    uploadDir: string;
  };
};

export const config: Config;
