/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules')],
  resolver: {
    extraNodeModules: {
      'react-gondola': path.resolve(__dirname, '../src'),
      // Important, those are all the dependencies
      // asked by the "../src" but which
      // are not present in the ROOT/node_modules
      // See https://github.com/facebook/metro/issues/7#issuecomment-464668678.
      mobx: path.resolve(__dirname, '../node_modules/mobx'),
      'mobx-react': path.resolve(__dirname, '../node_modules/mobx-react'),
      'mobx-utils': path.resolve(__dirname, '../node_modules/mobx-utils'),
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-native': path.resolve(__dirname, '../node_modules/react-native'),
      '@babel/plugin-proposal-decorators': path.resolve(__dirname, '../node_modules/@babel/plugin-proposal-decorators'),
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
