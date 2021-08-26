module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'google', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'require-jsdoc': 'off',
    'react/display-name': `off`,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'linebreak-style': 'off',
    'react/prop-types': 'off',
  },
};
