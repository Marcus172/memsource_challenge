module.exports = {
  root: true,
  env: {
    es6: true,
  },
  extends: '@react-native-community',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      arrowFunctions: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    'flowtype',
  ],
};
