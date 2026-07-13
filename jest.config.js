module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps', '<rootDir>/packages'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'apps/*/src/**/*.ts',
    'packages/*/src/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@opexninja/ui/(.*)$': '<rootDir>/packages/ui/src/$1',
    '^@opexninja/utils/(.*)$': '<rootDir>/packages/utils/src/$1',
    '^@opexninja/config/(.*)$': '<rootDir>/packages/config/src/$1',
    '^@opexninja/types/(.*)$': '<rootDir>/packages/types/src/$1',
  },
};
