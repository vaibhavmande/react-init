/** @type {import('jest').Config} */

module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: {
    '^.+\\.(css|png|jpg)$': '<rootDir>/src/test-utils/mockModules.ts',
    '@/(.*)': '<rootDir>/src/$1',
    '^test-utils$': '<rootDir>/src/test-utils/testUtils',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setupTests.ts'],
  globals: {
    TARGET_ENV: 'develop',
  },
};
