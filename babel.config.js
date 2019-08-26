module.exports = api => {
  const isTest = api.env('test');

  if (isTest) {
    return {
      presets: ['module:metro-react-native-babel-preset'],
    };
  }
  return {};
};
