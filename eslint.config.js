import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Module from 'node:module';

import eslintJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

const require = Module.createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {'module' | 'commonjs'} */
const defaultSourceType =
  require(join(__dirname, 'package.json')).type ?? 'commonjs';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  eslintJs.configs.recommended,
  prettierConfig,

  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },

    languageOptions: {
      sourceType: defaultSourceType,
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      },
      globals: {
        ...globals.nodeBuiltin
      }
    },

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
      'array-callback-return': [
        'error',
        { checkForEach: true, allowVoid: true }
      ],
      'no-constant-binary-expression': 'error', // default in 'eslint:recommended' since v9
      'no-constructor-return': 'error',
      'no-empty-static-block': 'error', // default in 'eslint:recommended' since v9
      'no-unmodified-loop-condition': 'error'
    }
  },

  {
    files: ['src/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  {
    // Why doesn't ESLint do this by default is beyond me.
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  },

  {
    // Why doesn't ESLint do this by default is beyond me.
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module'
    }
  },

  {
    // `ignores` field must be in the very bottom config.
    ignores: ['dist/**/*', '**/*-polyfill.*']
  }
];
