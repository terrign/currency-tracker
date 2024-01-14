/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  extensionsToTreatAsEsm: ['.tsx'],
  collectCoverageFrom: ['./src/**/*.{ts,tsx,js}', '!**/node_modules/**', '!**/vendor/**', '!./src/index.tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__test__/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^context/(.*)$': '<rootDir>/src/context/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^router/(.*)$': '<rootDir>/src/router/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^models$': '<rootDir>/src/models/index',
    '^utils': '<rootDir>/src/utils/index',
    '^@constants': '<rootDir>/src/constants/index',
    '^mocks/(.*)$': '<rootDir>/__test__/__mocks__/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  setupFiles: ['<rootDir>/__test__/jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/__test__/jest.setup.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
