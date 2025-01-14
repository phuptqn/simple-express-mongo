export default {
  testEnvironment: 'node',
  testTimeout: 30000,
  setupFiles: ['<rootDir>/tests/setup/before-env.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup/after-env.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  moduleFileExtensions: ['js'],
  // skip transfrom
  transform: {},
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: ['./src/**/*.js'],
  coveragePathIgnorePatterns: ['./src/models/index.js'],
};
