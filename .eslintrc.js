module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: 'babel-eslint',
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
