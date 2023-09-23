import type { Config } from 'jest';

export default (): Config => {
  return {
    clearMocks: true,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
      '!<rootDir>/src/**/*.d.ts',
      '!<rootDir>/src/routes/**',
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    moduleNameMapper: {
      '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/src/__mocks__/fileMock.js',
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      axios: '<rootDir>/node_modules/axios/dist/axios.min.js',
    },
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    watchPathIgnorePatterns: ['<rootDir>/src/cypress/'],
    moduleDirectories: ['node_modules', 'src'],
  };
};
