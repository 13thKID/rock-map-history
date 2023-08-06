module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  globalSetup: "./jest.globalSetup.ts",
  globalTeardown: "./jest.globalTeardown.ts",
  globalTeardown: "./jest.globalTeardown.ts"
};