import path from 'path';

module.exports = {
  native: true,
  typescript: true,
  menu: [
    'Welcome',
    'Getting Started',
    'Example',
    'Contribute',
    'Roadmap',
    { name: 'API', menu: ['createCanal', 'FullScreenPortal'] },
  ],
  modifyBundlerConfig: config => {
    // Combine the default docz aliases with our custom aliases.
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      'react-native$': 'react-native-web',
      'react-gondola$': path.resolve(__dirname, 'src/index.ts'), // eslint-disable-line
    });
    return config;
  },
  indexHtml: path.resolve(__dirname, 'docs/theme/index.html'), // eslint-disable-line
};
