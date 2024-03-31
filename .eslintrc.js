/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,

  env: {
    node: true,
    es2024: true
  },

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true
    }
  },

  extends: ['eslint:recommended', 'prettier'],

  rules: {
    'no-var': 'error',
    'no-await-in-loop': 'error',
    'no-implicit-globals': ['error'],
    'no-unused-vars': ['error', { vars: 'local', argsIgnorePattern: '^_' }],
    'no-useless-rename': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    'no-lonely-if': 'error',
    'prefer-object-has-own': 'error',
    'prefer-exponentiation-operator': 'error',
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    'array-callback-return': ['error', { checkForEach: true, allowVoid: true }],
    'no-constant-binary-expression': 'error', // default in 'eslint:recommended' since v9
    'no-constructor-return': 'error',
    'no-empty-static-block': 'error', // default in 'eslint:recommended' since v9
    'no-unmodified-loop-condition': 'error'
  }
};

module.exports = config;
