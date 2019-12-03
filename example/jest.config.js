module.exports = {
  moduleDirectories: ['node_modules', '../node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^react-nonav$': '<rootDir>/../src/',
    '^react-native$': '<rootDir>/node_modules/react-native/',
    '^react-native-reanimated$':
      '<rootDir>/node_modules/react-native-reanimated/',
  },
  modulePathIgnorePatterns: ['<rootDir>/../node_modules/react-native/'],
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
};
