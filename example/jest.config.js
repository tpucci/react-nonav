module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'example/node_modules'],
  rootDir: '..',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/src/'],
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules/react-native/'],
};
