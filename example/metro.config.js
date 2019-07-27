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
  watchFolders: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules')],
  resolver: {
    blacklistRE: blacklist([new RegExp(`${rootPath}/node_modules/react-native/.*`)]),
    extraNodeModules: {
      'react-gondola': path.resolve(__dirname, '../src'),
      // Important, those are all the dependencies
      // asked by the "../src" but which
      // are not present in the ROOT/node_modules
      // See https://github.com/facebook/metro/issues/7#issuecomment-464668678.
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
      '@babel/plugin-proposal-decorators': path.resolve(
        __dirname,
        '../node_modules/@babel/plugin-proposal-decorators'
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
