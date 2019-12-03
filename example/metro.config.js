/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const rootPath = path.resolve(__dirname, '..');

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../node_modules'),
  ],
  resolver: {
    blacklistRE: blacklist([
      new RegExp(`${rootPath}/node_modules/react-native/.*`),
    ]),
    extraNodeModules: {
      'react-nonav': path.resolve(__dirname, '../src'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
      'react-native-reanimated': path.resolve(
        __dirname,
        'node_modules/react-native-reanimated',
      ),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
