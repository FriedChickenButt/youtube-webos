/* eslint-env node */

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    }
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-promise-executor-return': 'error',
    'no-var': 'warn',
    'no-unused-private-class-members': 'error',
    'no-await-in-loop': 'error',
    'array-callback-return': 'error',
    'no-implicit-globals': ['error'],
    'no-unused-vars': ['error', { vars: 'local', argsIgnorePattern: '^_' }]
  }
};
