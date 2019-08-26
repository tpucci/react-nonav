import path from 'path';

module.exports = {
  native: true,
  typescript: true,
  menu: [
    'Welcome',
    'Getting Started',
    { name: 'Guides', menu: ['Back', 'Transitions', 'React Navigation Interoperability'] },
    'Example',
    'Contribute',
    'Roadmap',
    { name: 'API', menu: ['Screen', 'FullScreenPortal'] },
  ],
  modifyBundlerConfig: config => {
    // Combine the default docz aliases with our custom aliases.
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      components: path.resolve(__dirname, 'docs/components/'),
      'react-native$': 'react-native-web',
      'react-gondola$': path.resolve(__dirname, 'src/index.ts'), // eslint-disable-line
      'react-native-reanimated$': path.resolve(__dirname, 'docs/mocks/react-native-reanimated'), // eslint-disable-line
    });
    return config;
  },
  indexHtml: path.resolve(__dirname, 'docs/theme/index.html'), // eslint-disable-line
};
