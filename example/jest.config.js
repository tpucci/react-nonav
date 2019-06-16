module.exports = {
  moduleDirectories: ['node_modules', 'example/node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules/react-native/'],
  preset: 'react-native',
  rootDir: '..',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/src/'],
};
