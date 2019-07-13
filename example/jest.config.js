module.exports = {
  moduleDirectories: ['node_modules', 'example/node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules/react-native/'],
  preset: 'react-native',
  rootDir: '..',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/src/'],
  moduleNameMapper: {
    '^react-gondola$': '<rootDir>/src/',
    '^react-gondola/transitions$': '<rootDir>/src/transitions',
  },
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
};
